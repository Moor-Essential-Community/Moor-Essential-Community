// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

/**
 * @title MECCATreasury
 * @notice Community treasury for MECCA.DAO.
 * Controlled by the Timelock (i.e., governance). Supports ETH and any ERC-20.
 */
contract MECCATreasury is AccessControl, ReentrancyGuard {
    using SafeERC20 for IERC20;

    bytes32 public constant GOVERNOR_ROLE = keccak256("GOVERNOR_ROLE");

    event ETHReceived(address indexed sender, uint256 amount);
    event ETHWithdrawn(address indexed to, uint256 amount);
    event ERC20Withdrawn(address indexed token, address indexed to, uint256 amount);

    constructor(address timelockAddress) {
        _grantRole(DEFAULT_ADMIN_ROLE, timelockAddress);
        _grantRole(GOVERNOR_ROLE, timelockAddress);
    }

    receive() external payable {
        emit ETHReceived(msg.sender, msg.value);
    }

    /**
     * @notice Withdraw ETH to a recipient. Only callable via governance (Timelock).
     */
    function withdrawETH(address payable to, uint256 amount)
        external
        onlyRole(GOVERNOR_ROLE)
        nonReentrant
    {
        require(address(this).balance >= amount, "MECCATreasury: insufficient ETH");
        (bool success, ) = to.call{value: amount}("");
        require(success, "MECCATreasury: ETH transfer failed");
        emit ETHWithdrawn(to, amount);
    }

    /**
     * @notice Withdraw ERC-20 tokens. Only callable via governance (Timelock).
     */
    function withdrawERC20(address token, address to, uint256 amount)
        external
        onlyRole(GOVERNOR_ROLE)
        nonReentrant
    {
        IERC20(token).safeTransfer(to, amount);
        emit ERC20Withdrawn(token, to, amount);
    }

    function ethBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function tokenBalance(address token) external view returns (uint256) {
        return IERC20(token).balanceOf(address(this));
    }
}
