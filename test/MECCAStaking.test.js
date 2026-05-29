const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time } = require("@nomicfoundation/hardhat-network-helpers");

describe("MECCAStaking", () => {
  let token, staking, owner, alice;
  const REWARD_RATE = ethers.parseEther("1"); // 1 MECCA/sec total pool

  beforeEach(async () => {
    [owner, alice] = await ethers.getSigners();

    const MECCAToken = await ethers.getContractFactory("MECCAToken");
    token = await MECCAToken.deploy(owner.address);

    const MECCAStaking = await ethers.getContractFactory("MECCAStaking");
    staking = await MECCAStaking.deploy(await token.getAddress(), owner.address);

    // Mint tokens to alice and fund rewards in staking contract
    await token.mint(alice.address, ethers.parseEther("10000"));
    await token.mint(owner.address, ethers.parseEther("100000"));
    await token.approve(await staking.getAddress(), ethers.parseEther("100000"));
    await staking.fundRewards(ethers.parseEther("100000"));
    await staking.setRewardRate(REWARD_RATE);
  });

  it("alice can stake tokens", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1000"));
    await staking.connect(alice).stake(ethers.parseEther("1000"));
    const info = await staking.stakes(alice.address);
    expect(info.amount).to.equal(ethers.parseEther("1000"));
  });

  it("reverts if below minimum stake", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1"));
    await expect(staking.connect(alice).stake(ethers.parseEther("1")))
      .to.be.revertedWith("MECCAStaking: below minimum stake");
  });

  it("alice earns rewards over time", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1000"));
    await staking.connect(alice).stake(ethers.parseEther("1000"));
    await time.increase(100);
    const earned = await staking.earned(alice.address);
    expect(earned).to.be.gt(0);
  });

  it("alice can claim rewards after lock period", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1000"));
    await staking.connect(alice).stake(ethers.parseEther("1000"));
    await time.increase(7 * 24 * 3600 + 1);

    const balBefore = await token.balanceOf(alice.address);
    await staking.connect(alice).claimReward();
    const balAfter = await token.balanceOf(alice.address);
    expect(balAfter).to.be.gt(balBefore);
  });

  it("alice cannot unstake during lock period", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1000"));
    await staking.connect(alice).stake(ethers.parseEther("1000"));
    await expect(staking.connect(alice).unstake(ethers.parseEther("1000")))
      .to.be.revertedWith("MECCAStaking: lock period active");
  });

  it("alice can unstake after lock period", async () => {
    await token.connect(alice).approve(await staking.getAddress(), ethers.parseEther("1000"));
    await staking.connect(alice).stake(ethers.parseEther("1000"));
    await time.increase(7 * 24 * 3600 + 1);
    await staking.connect(alice).unstake(ethers.parseEther("1000"));
    const info = await staking.stakes(alice.address);
    expect(info.amount).to.equal(0);
  });
});
