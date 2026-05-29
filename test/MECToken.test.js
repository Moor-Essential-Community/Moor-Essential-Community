const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MECToken", () => {
  let mec, owner, alice, bob;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const MECToken = await ethers.getContractFactory("MECToken");
    mec = await MECToken.deploy(owner.address);
  });

  it("has correct name, symbol, decimals", async () => {
    expect(await mec.name()).to.equal("MEC Governance Token");
    expect(await mec.symbol()).to.equal("MEC");
    expect(await mec.decimals()).to.equal(18);
  });

  it("has correct max supply of 144,000,000", async () => {
    expect(await mec.MAX_SUPPLY()).to.equal(ethers.parseEther("144000000"));
  });

  it("owner can mint up to max supply", async () => {
    await mec.mint(alice.address, ethers.parseEther("144000000"));
    expect(await mec.totalSupply()).to.equal(ethers.parseEther("144000000"));
  });

  it("reverts when minting beyond 144M cap", async () => {
    await mec.mint(alice.address, ethers.parseEther("144000000"));
    await expect(mec.mint(bob.address, 1n))
      .to.be.revertedWith("MECToken: max supply exceeded");
  });

  it("non-owner cannot mint", async () => {
    await expect(mec.connect(alice).mint(alice.address, ethers.parseEther("1")))
      .to.be.revertedWithCustomError(mec, "OwnableUnauthorizedAccount");
  });

  it("supports ERC20Votes delegation", async () => {
    await mec.mint(alice.address, ethers.parseEther("50000"));
    await mec.connect(alice).delegate(alice.address);
    expect(await mec.getVotes(alice.address)).to.equal(ethers.parseEther("50000"));
  });
});
