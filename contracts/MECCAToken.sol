// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MECCAToken
 * @notice Utility and ecosystem token for MECCA.DAO.
 * Symbol: MECCA | Max supply: 9,000,000,000 (9 billion).
 */
contract MECCAToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 9_000_000_000 * 10 ** 18;

    event TokensMinted(address indexed to, uint256 amount);

    constructor(address initialOwner)
        ERC20("MECCA Ecosystem Token", "MECCA")
        ERC20Permit("MECCA Token")
        Ownable(initialOwner)
    {}

    /**
     * @notice Mint tokens. Only callable by owner (initially deployer, then DAO Timelock).
     * @dev Total supply can never exceed MAX_SUPPLY.
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "MECCAToken: max supply exceeded");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    // ----- ERC20Votes + ERC20Permit overrides -----

    function _update(address from, address to, uint256 value)
        internal
        override(ERC20, ERC20Votes)
    {
        super._update(from, to, value);
    }

    function nonces(address owner)
        public
        view
        override(ERC20Permit, Nonces)
        returns (uint256)
    {
        return super.nonces(owner);
    }
}
