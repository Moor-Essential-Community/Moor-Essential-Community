// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MECCAStaking
 * @notice Stake $MECCA tokens to earn rewards and amplify governance power.
 *
 * Reward model: simple per-second emission rate set by owner (DAO Timelock).
 * Rewards are paid in $MECCA. The contract must hold enough reward tokens.
 */
contract MECCAStaking is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    IERC20 public immutable mecca;

    uint256 public rewardRate;       // tokens per second for the entire pool
    uint256 public lastUpdateTime;
    uint256 public rewardPerTokenStored;

    uint256 public totalStaked;

    struct StakeInfo {
        uint256 amount;
        uint256 rewardPerTokenPaid;
        uint256 rewards;
        uint256 stakedAt;
    }

    mapping(address => StakeInfo) public stakes;

    uint256 public constant MIN_STAKE = 100e18;
    uint256 public constant LOCK_PERIOD = 7 days;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardClaimed(address indexed user, uint256 reward);
    event RewardRateUpdated(uint256 newRate);

    constructor(address _mecca, address initialOwner) Ownable(initialOwner) {
        mecca = IERC20(_mecca);
    }

    // ----- Modifiers -----

    modifier updateReward(address account) {
        rewardPerTokenStored = rewardPerToken();
        lastUpdateTime = block.timestamp;
        if (account != address(0)) {
            stakes[account].rewards = earned(account);
            stakes[account].rewardPerTokenPaid = rewardPerTokenStored;
        }
        _;
    }

    // ----- Views -----

    function rewardPerToken() public view returns (uint256) {
        if (totalStaked == 0) return rewardPerTokenStored;
        return rewardPerTokenStored +
            ((block.timestamp - lastUpdateTime) * rewardRate * 1e18) / totalStaked;
    }

    function earned(address account) public view returns (uint256) {
        StakeInfo memory s = stakes[account];
        return (s.amount * (rewardPerToken() - s.rewardPerTokenPaid)) / 1e18 + s.rewards;
    }

    function canUnstake(address account) public view returns (bool) {
        return block.timestamp >= stakes[account].stakedAt + LOCK_PERIOD;
    }

    // ----- Actions -----

    function stake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(amount >= MIN_STAKE, "MECCAStaking: below minimum stake");
        mecca.safeTransferFrom(msg.sender, address(this), amount);
        stakes[msg.sender].amount += amount;
        stakes[msg.sender].stakedAt = block.timestamp;
        totalStaked += amount;
        emit Staked(msg.sender, amount);
    }

    function unstake(uint256 amount) external nonReentrant updateReward(msg.sender) {
        require(canUnstake(msg.sender), "MECCAStaking: lock period active");
        require(stakes[msg.sender].amount >= amount, "MECCAStaking: insufficient stake");
        stakes[msg.sender].amount -= amount;
        totalStaked -= amount;
        mecca.safeTransfer(msg.sender, amount);
        emit Unstaked(msg.sender, amount);
    }

    function claimReward() external nonReentrant updateReward(msg.sender) {
        uint256 reward = stakes[msg.sender].rewards;
        require(reward > 0, "MECCAStaking: no rewards");
        stakes[msg.sender].rewards = 0;
        mecca.safeTransfer(msg.sender, reward);
        emit RewardClaimed(msg.sender, reward);
    }

    // ----- Admin (DAO Timelock) -----

    function setRewardRate(uint256 newRate) external onlyOwner updateReward(address(0)) {
        rewardRate = newRate;
        emit RewardRateUpdated(newRate);
    }

    function fundRewards(uint256 amount) external onlyOwner {
        mecca.safeTransferFrom(msg.sender, address(this), amount);
    }
}
