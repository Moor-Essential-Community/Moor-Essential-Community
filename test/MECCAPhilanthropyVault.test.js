const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("MECCAPhilanthropyVault", () => {
  let vault, token, owner, alice, charity;

  beforeEach(async () => {
    [owner, alice, charity] = await ethers.getSigners();

    const MECCAPhilanthropyVault = await ethers.getContractFactory("MECCAPhilanthropyVault");
    vault = await MECCAPhilanthropyVault.deploy(owner.address);

    const MECCAToken = await ethers.getContractFactory("MECCAToken");
    token = await MECCAToken.deploy(owner.address);
  });

  it("accepts ETH donations", async () => {
    await alice.sendTransaction({ to: await vault.getAddress(), value: ethers.parseEther("1") });
    expect(await vault.ethBalance()).to.equal(ethers.parseEther("1"));
  });

  it("accepts ERC-20 donations", async () => {
    await token.mint(alice.address, ethers.parseEther("500"));
    await token.connect(alice).approve(await vault.getAddress(), ethers.parseEther("500"));
    await vault.connect(alice).donateERC20(await token.getAddress(), ethers.parseEther("500"));
    expect(await token.balanceOf(await vault.getAddress())).to.equal(ethers.parseEther("500"));
  });

  it("governor can allocate ETH to charity", async () => {
    await alice.sendTransaction({ to: await vault.getAddress(), value: ethers.parseEther("2") });
    const before = await ethers.provider.getBalance(charity.address);
    await vault.allocateETH(charity.address, ethers.parseEther("1"), "Feed the community");
    const after = await ethers.provider.getBalance(charity.address);
    expect(after - before).to.equal(ethers.parseEther("1"));
    expect(await vault.allocationCount()).to.equal(1);
  });

  it("governor can allocate ERC-20 to charity", async () => {
    await token.mint(await vault.getAddress(), ethers.parseEther("1000"));
    await vault.allocateERC20(await token.getAddress(), charity.address, ethers.parseEther("1000"), "Education fund");
    expect(await token.balanceOf(charity.address)).to.equal(ethers.parseEther("1000"));
  });

  it("non-governor cannot allocate", async () => {
    await alice.sendTransaction({ to: await vault.getAddress(), value: ethers.parseEther("1") });
    await expect(vault.connect(alice).allocateETH(charity.address, ethers.parseEther("1"), "Hack"))
      .to.be.revertedWithCustomError(vault, "AccessControlUnauthorizedAccount");
  });

  it("records allocation history", async () => {
    await alice.sendTransaction({ to: await vault.getAddress(), value: ethers.parseEther("3") });
    await vault.allocateETH(charity.address, ethers.parseEther("1"), "Cause A");
    await vault.allocateETH(charity.address, ethers.parseEther("1"), "Cause B");
    expect(await vault.allocationCount()).to.equal(2);
    const allocation = await vault.allocations(0);
    expect(allocation.cause).to.equal("Cause A");
  });
});
