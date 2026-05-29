const { expect } = require("chai");
const { ethers } = require("hardhat");
const { time, mine } = require("@nomicfoundation/hardhat-network-helpers");

describe("MECCAGovernor", () => {
  let token, timelock, governor, treasury;
  let owner, alice, bob;

  beforeEach(async () => {
    [owner, alice, bob] = await ethers.getSigners();

    const MECCAToken = await ethers.getContractFactory("MECCAToken");
    token = await MECCAToken.deploy(owner.address);

    // Short delays for testing
    const MECCATimelockController = await ethers.getContractFactory("MECCATimelockController");
    timelock = await MECCATimelockController.deploy(60, [], [ethers.ZeroAddress], owner.address);

    const MECCAGovernor = await ethers.getContractFactory("MECCAGovernor");
    governor = await MECCAGovernor.deploy(await token.getAddress(), await timelock.getAddress());

    const MECCATreasury = await ethers.getContractFactory("MECCATreasury");
    treasury = await MECCATreasury.deploy(await timelock.getAddress());

    // Wire up roles
    const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
    const CANCELLER_ROLE = await timelock.CANCELLER_ROLE();
    await timelock.grantRole(PROPOSER_ROLE, await governor.getAddress());
    await timelock.grantRole(CANCELLER_ROLE, await governor.getAddress());

    // Distribute and delegate voting power
    await token.mint(alice.address, ethers.parseEther("100000"));
    await token.mint(bob.address, ethers.parseEther("50000"));
    await token.connect(alice).delegate(alice.address);
    await token.connect(bob).delegate(bob.address);

    // Fund treasury
    await owner.sendTransaction({ to: await treasury.getAddress(), value: ethers.parseEther("5") });
  });

  it("alice has sufficient votes to propose", async () => {
    const votes = await token.getVotes(alice.address);
    expect(votes).to.be.gte(await governor.proposalThreshold());
  });

  it("full governance flow: propose → vote → queue → execute", async () => {
    // Build call: withdraw 1 ETH from treasury to bob
    const calldata = treasury.interface.encodeFunctionData("withdrawETH", [
      bob.address,
      ethers.parseEther("1"),
    ]);

    // Propose
    const tx = await governor.connect(alice).propose(
      [await treasury.getAddress()],
      [0],
      [calldata],
      "Proposal #1: Pay Bob 1 ETH for services"
    );
    const receipt = await tx.wait();
    const proposalId = receipt.logs
      .map(log => { try { return governor.interface.parseLog(log); } catch { return null; } })
      .find(e => e?.name === "ProposalCreated")?.args?.proposalId;

    expect(proposalId).to.not.be.undefined;

    // Advance past voting delay
    await time.increase(1 * 24 * 3600 + 1);
    await mine(1);

    // Vote
    await governor.connect(alice).castVote(proposalId, 1); // 1 = For
    await governor.connect(bob).castVote(proposalId, 1);

    // Advance past voting period
    await time.increase(7 * 24 * 3600 + 1);
    await mine(1);

    // Check proposal state = Succeeded (4)
    expect(await governor.state(proposalId)).to.equal(4);

    // Queue
    const descHash = ethers.id("Proposal #1: Pay Bob 1 ETH for services");
    await governor.queue([await treasury.getAddress()], [0], [calldata], descHash);

    // Advance past timelock
    await time.increase(61);

    // Execute
    const balBefore = await ethers.provider.getBalance(bob.address);
    await governor.execute([await treasury.getAddress()], [0], [calldata], descHash);
    const balAfter = await ethers.provider.getBalance(bob.address);

    expect(balAfter - balBefore).to.equal(ethers.parseEther("1"));
    expect(await governor.state(proposalId)).to.equal(7); // Executed
  });
});
