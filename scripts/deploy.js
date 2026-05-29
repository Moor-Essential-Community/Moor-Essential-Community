const { ethers } = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying MECCA.DAO contracts with:", deployer.address);
  console.log("Balance:", ethers.formatEther(await ethers.provider.getBalance(deployer.address)), "ETH\n");

  // 1. MECCAToken
  const MECCAToken = await ethers.getContractFactory("MECCAToken");
  const token = await MECCAToken.deploy(deployer.address);
  await token.waitForDeployment();
  console.log("MECCAToken deployed to:", await token.getAddress());

  // 2. MECCATimelockController (2-day delay for mainnet; 60s for testing)
  const minDelay = process.env.NETWORK === "mainnet" ? 2 * 24 * 3600 : 60;
  const MECCATimelockController = await ethers.getContractFactory("MECCATimelockController");
  const timelock = await MECCATimelockController.deploy(
    minDelay,
    [],          // proposers set by Governor post-deploy
    [ethers.ZeroAddress],  // anyone can execute
    deployer.address
  );
  await timelock.waitForDeployment();
  console.log("MECCATimelockController deployed to:", await timelock.getAddress());

  // 3. MECCAGovernor
  const MECCAGovernor = await ethers.getContractFactory("MECCAGovernor");
  const governor = await MECCAGovernor.deploy(await token.getAddress(), await timelock.getAddress());
  await governor.waitForDeployment();
  console.log("MECCAGovernor deployed to:", await governor.getAddress());

  // 4. Grant Governor the PROPOSER_ROLE on Timelock
  const PROPOSER_ROLE = await timelock.PROPOSER_ROLE();
  const CANCELLER_ROLE = await timelock.CANCELLER_ROLE();
  await (await timelock.grantRole(PROPOSER_ROLE, await governor.getAddress())).wait();
  await (await timelock.grantRole(CANCELLER_ROLE, await governor.getAddress())).wait();
  console.log("Governor granted PROPOSER + CANCELLER roles on Timelock");

  // Revoke deployer admin from Timelock — governance is now fully on-chain
  const TIMELOCK_ADMIN_ROLE = await timelock.DEFAULT_ADMIN_ROLE();
  await (await timelock.revokeRole(TIMELOCK_ADMIN_ROLE, deployer.address)).wait();
  console.log("Deployer admin role revoked from Timelock");

  // 5. MECCATreasury
  const MECCATreasury = await ethers.getContractFactory("MECCATreasury");
  const treasury = await MECCATreasury.deploy(await timelock.getAddress());
  await treasury.waitForDeployment();
  console.log("MECCATreasury deployed to:", await treasury.getAddress());

  // 6. MECCANFTMembership
  const MECCANFTMembership = await ethers.getContractFactory("MECCANFTMembership");
  const nft = await MECCANFTMembership.deploy(await timelock.getAddress());
  await nft.waitForDeployment();
  console.log("MECCANFTMembership deployed to:", await nft.getAddress());

  // 7. MECCAStaking
  const MECCAStaking = await ethers.getContractFactory("MECCAStaking");
  const staking = await MECCAStaking.deploy(await token.getAddress(), await timelock.getAddress());
  await staking.waitForDeployment();
  console.log("MECCAStaking deployed to:", await staking.getAddress());

  // 8. MECCAPhilanthropyVault
  const MECCAPhilanthropyVault = await ethers.getContractFactory("MECCAPhilanthropyVault");
  const vault = await MECCAPhilanthropyVault.deploy(await timelock.getAddress());
  await vault.waitForDeployment();
  console.log("MECCAPhilanthropyVault deployed to:", await vault.getAddress());

  // Transfer MECCAToken ownership to Timelock so governance controls minting
  await (await token.transferOwnership(await timelock.getAddress())).wait();
  console.log("\nMECCAToken ownership transferred to Timelock");

  console.log("\n=== MECCA.DAO Deployment Complete ===");
  console.log({
    MECCAToken: await token.getAddress(),
    MECCATimelockController: await timelock.getAddress(),
    MECCAGovernor: await governor.getAddress(),
    MECCATreasury: await treasury.getAddress(),
    MECCANFTMembership: await nft.getAddress(),
    MECCAStaking: await staking.getAddress(),
    MECCAPhilanthropyVault: await vault.getAddress(),
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
