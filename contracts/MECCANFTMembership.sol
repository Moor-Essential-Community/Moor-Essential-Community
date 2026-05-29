// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

/**
 * @title MECCANFTMembership
 * @notice Soulbound (non-transferable) membership NFTs for MECCA.DAO.
 *
 * Tiers:
 *   0 = Ally      — Unlimited supply
 *   1 = Community — Max 7,777
 *   2 = Founding  — Max 777
 *
 * Soulbound: transfers are blocked except mint (from == address(0)).
 */
contract MECCANFTMembership is ERC721, ERC721URIStorage, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    enum Tier { Ally, Community, Founding }

    uint256 public constant MAX_COMMUNITY = 7_777;
    uint256 public constant MAX_FOUNDING = 777;

    uint256 private _nextTokenId;
    mapping(uint256 => Tier) public tokenTier;
    mapping(Tier => uint256) public tierMintCount;

    event MembershipMinted(address indexed to, uint256 tokenId, Tier tier);

    constructor(address admin) ERC721("MECCA Membership", "MECCAM") {
        _grantRole(DEFAULT_ADMIN_ROLE, admin);
        _grantRole(MINTER_ROLE, admin);
    }

    /**
     * @notice Mint a membership NFT to an address.
     * @param to    Recipient address.
     * @param tier  Membership tier (0=Ally, 1=Community, 2=Founding).
     * @param uri   Metadata URI for the NFT.
     */
    function mint(address to, Tier tier, string calldata uri)
        external
        onlyRole(MINTER_ROLE)
    {
        if (tier == Tier.Community) {
            require(tierMintCount[Tier.Community] < MAX_COMMUNITY, "MECCANFTMembership: Community cap reached");
        } else if (tier == Tier.Founding) {
            require(tierMintCount[Tier.Founding] < MAX_FOUNDING, "MECCANFTMembership: Founding cap reached");
        }

        uint256 tokenId = ++_nextTokenId;
        tokenTier[tokenId] = tier;
        tierMintCount[tier]++;

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);

        emit MembershipMinted(to, tokenId, tier);
    }

    // ----- Soulbound: block all transfers except mint (from == address(0)) -----

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721URIStorage)
        returns (address)
    {
        address from = _ownerOf(tokenId);
        require(from == address(0), "MECCANFTMembership: soulbound — non-transferable");
        return super._update(to, tokenId, auth);
    }

    // ----- Required overrides -----

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage, AccessControl)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
