// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Permit.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title MECToken
 * @notice Primary governance token for MECCA.DAO.
 * Symbol: MEC | Max supply: 144,000,000 (144 million).
 *
 * 144,000,000 — the number of the sealed elect across traditions;
 * chosen as the governance token supply to honor sacred numerology.
 */
contract MECToken is ERC20, ERC20Burnable, ERC20Permit, ERC20Votes, Ownable {
    uint256 public constant MAX_SUPPLY = 144_000_000 * 10 ** 18;

    event TokensMinted(address indexed to, uint256 amount);

    constructor(address initialOwner)
        ERC20("MEC Governance Token", "MEC")
        ERC20Permit("MEC Governance Token")
        Ownable(initialOwner)
    {}

    /**
     * @notice Mint MEC tokens. Only callable by owner (DAO Timelock after deployment).
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "MECToken: max supply exceeded");
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
