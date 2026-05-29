const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MECCAToken", () => {
  let token, owner, alice, bob;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();
    const MECCAToken = await ethers.getContractFactory("MECCAToken");
    token = await MECCAToken.deploy(owner.address);
  });

  it("has correct name, symbol, decimals", async () => {
    expect(await token.name()).to.equal("MECCA Token");
    expect(await token.symbol()).to.equal("MECCA");
    expect(await token.decimals()).to.equal(18);
  });

  it("has correct max supply constant", async () => {
    const maxSupply = await token.MAX_SUPPLY();
    expect(maxSupply).to.equal(ethers.parseEther("777777777"));
  });

  it("owner can mint tokens", async () => {
    await token.mint(alice.address, ethers.parseEther("1000"));
    expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("1000"));
  });

  it("non-owner cannot mint", async () => {
    await expect(token.connect(alice).mint(alice.address, ethers.parseEther("1")))
      .to.be.revertedWithCustomError(token, "OwnableUnauthorizedAccount");
  });

  it("reverts when mint would exceed max supply", async () => {
    const maxSupply = await token.MAX_SUPPLY();
    await token.mint(alice.address, maxSupply);
    await expect(token.mint(bob.address, 1n))
      .to.be.revertedWith("MECCAToken: max supply exceeded");
  });

  it("supports delegation and vote snapshots", async () => {
    await token.mint(alice.address, ethers.parseEther("5000"));
    await token.connect(alice).delegate(alice.address);
    expect(await token.getVotes(alice.address)).to.equal(ethers.parseEther("5000"));
  });

  it("tokens can be burned", async () => {
    await token.mint(alice.address, ethers.parseEther("100"));
    await token.connect(alice).burn(ethers.parseEther("50"));
    expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("50"));
  });
});
