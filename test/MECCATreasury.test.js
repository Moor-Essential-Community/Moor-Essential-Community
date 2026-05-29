const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MECCATreasury", () => {
  let treasury, token, timelock, owner, alice;

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();

    // Deploy a minimal timelock — owner acts as the "governor" for tests
    const MECCATreasury = await ethers.getContractFactory("MECCATreasury");
    treasury = await MECCATreasury.deploy(owner.address);

    const MECCAToken = await ethers.getContractFactory("MECCAToken");
    token = await MECCAToken.deploy(owner.address);
  });

  it("accepts ETH deposits", async () => {
    await owner.sendTransaction({ to: await treasury.getAddress(), value: ethers.parseEther("1") });
    expect(await treasury.ethBalance()).to.equal(ethers.parseEther("1"));
  });

  it("governor can withdraw ETH", async () => {
    await owner.sendTransaction({ to: await treasury.getAddress(), value: ethers.parseEther("2") });
    const before = await ethers.provider.getBalance(alice.address);
    await treasury.withdrawETH(alice.address, ethers.parseEther("1"));
    const after = await ethers.provider.getBalance(alice.address);
    expect(after - before).to.equal(ethers.parseEther("1"));
  });

  it("non-governor cannot withdraw ETH", async () => {
    await owner.sendTransaction({ to: await treasury.getAddress(), value: ethers.parseEther("1") });
    await expect(treasury.connect(alice).withdrawETH(alice.address, ethers.parseEther("1")))
      .to.be.revertedWithCustomError(treasury, "AccessControlUnauthorizedAccount");
  });

  it("governor can withdraw ERC-20 tokens", async () => {
    await token.mint(await treasury.getAddress(), ethers.parseEther("500"));
    await treasury.withdrawERC20(await token.getAddress(), alice.address, ethers.parseEther("500"));
    expect(await token.balanceOf(alice.address)).to.equal(ethers.parseEther("500"));
  });

  it("reverts ETH withdrawal when balance insufficient", async () => {
    await expect(treasury.withdrawETH(alice.address, ethers.parseEther("1")))
      .to.be.revertedWith("MECCATreasury: insufficient ETH");
  });
});
