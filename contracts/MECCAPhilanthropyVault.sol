// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MECCAPhilanthropyVault
 * @notice Dedicated vault for charitable allocations voted on by MECCA.DAO governance.
 *
 * The DAO Timelock holds GOVERNOR_ROLE and is the only caller that can allocate funds.
 * Any member can donate ETH or ERC-20 tokens directly to this vault.
 */
contract MECCAPhilanthropyVault is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    struct Allocation {
        address recipient;
        address token;      // address(0) = ETH
        uint256 amount;
        string cause;
        uint256 timestamp;
    }

    Allocation[] public allocations;

    event Donated(address indexed donor, address token, uint256 amount);
    event Allocated(address indexed recipient, address token, uint256 amount, string cause);

    constructor(address timelockAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, timelockAddress);
        _grantRole(GOVERNOR_ROLE, timelockAddress);
    }

    receive() external payable {
        emit Donated(msg.sender, address(0), msg.value);
    }

    function donateERC20(address token, uint256 amount) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount);
        emit Donated(msg.sender, token, amount);
    }

    /**
     * @notice Allocate ETH to a charitable cause. Only callable via governance.
     * @param recipient Charity or cause wallet address.
     * @param amount    Amount in wei.
     * @param cause     Human-readable description of the cause.
     */
    function allocateETH(address payable recipient, uint256 amount, string calldata cause)
        external
        onlyRole(GOVERNOR_ROLE)
        nonReentrant
    {
        require(address(this).balance >= amount, "MECCAPhilanthropyVault: insufficient ETH");
        (bool success, ) = recipient.call{value: amount}("");
        require(success, "MECCAPhilanthropyVault: transfer failed");
        allocations.push(Allocation(recipient, address(0), amount, cause, block.timestamp));
        emit Allocated(recipient, address(0), amount, cause);
    }

    /**
     * @notice Allocate ERC-20 tokens to a charitable cause. Only callable via governance.
     */
    function allocateERC20(address token, address recipient, uint256 amount, string calldata cause)
        external
        onlyRole(GOVERNOR_ROLE)
        nonReentrant
    {
        IERC20(token).safeTransfer(recipient, amount);
        allocations.push(Allocation(recipient, token, amount, cause, block.timestamp));
        emit Allocated(recipient, token, amount, cause);
    }

    function allocationCount() external view returns (uint256) {
        return allocations.length;
    }

    function ethBalance() external view returns (uint256) {
        return address(this).balance;
    }
}
