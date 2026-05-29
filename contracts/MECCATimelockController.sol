// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/governance/TimelockController.sol";

/**
 * @title MECCATimelockController
 * @notice Governance execution delay for MECCA.DAO.
 * Enforces a minimum 2-day delay between proposal passage and execution.
 */
contract MECCATimelockController is TimelockController {
    constructor(
        uint256 minDelay,
        address[] memory proposers,
        address[] memory executors,
        address admin
    ) TimelockController(minDelay, proposers, executors, admin) {}
}
