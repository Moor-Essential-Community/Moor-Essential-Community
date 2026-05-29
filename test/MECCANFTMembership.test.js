const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MECCANFTMembership", () => {
  let nft, owner, alice, bob;
  const Tier = { Ally: 0, Community: 1, Founding: 2 };

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const MECCANFTMembership = await ethers.getContractFactory("MECCANFTMembership");
    nft = await MECCANFTMembership.deploy(owner.address);
  });

  it("minter can mint Ally NFT", async () => {
    await nft.mint(alice.address, Tier.Ally, "ipfs://ally-metadata");
    expect(await nft.balanceOf(alice.address)).to.equal(1);
    expect(await nft.tokenTier(1)).to.equal(Tier.Ally);
  });

  it("minter can mint Community NFT", async () => {
    await nft.mint(alice.address, Tier.Community, "ipfs://community-metadata");
    expect(await nft.tierMintCount(Tier.Community)).to.equal(1);
  });

  it("minter can mint Founding NFT", async () => {
    await nft.mint(alice.address, Tier.Founding, "ipfs://founding-metadata");
    expect(await nft.tierMintCount(Tier.Founding)).to.equal(1);
  });

  it("non-minter cannot mint", async () => {
    await expect(nft.connect(alice).mint(alice.address, Tier.Ally, "ipfs://test"))
      .to.be.revertedWithCustomError(nft, "AccessControlUnauthorizedAccount");
  });

  it("NFTs are soulbound — transfers are blocked", async () => {
    await nft.mint(alice.address, Tier.Ally, "ipfs://ally");
    await expect(
      nft.connect(alice).transferFrom(alice.address, bob.address, 1)
    ).to.be.revertedWith("MECCANFTMembership: soulbound — non-transferable");
  });

  it("tokenURI is set correctly", async () => {
    await nft.mint(alice.address, Tier.Community, "ipfs://QmTest123");
    expect(await nft.tokenURI(1)).to.equal("ipfs://QmTest123");
  });
});
