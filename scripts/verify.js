const { run } = require("hardhat");

// Update these after deployment
const ADDRESSES = {
  MECCAToken: process.env.MECCA_TOKEN,
  MECCATimelockController: process.env.MECCA_TIMELOCK,
  MECCAGovernor: process.env.MECCA_GOVERNOR,
  MECCATreasury: process.env.MECCA_TREASURY,
  MECCANFTMembership: process.env.MECCA_NFT,
  MECCAStaking: process.env.MECCA_STAKING,
  MECCAPhilanthropyVault: process.env.MECCA_VAULT,
};

async function verify(address, constructorArguments) {
  try {
    await run("verify:verify", { address, constructorArguments });
    console.log(`✅ Verified: ${address}`);
  } catch (e) {
    if (e.message.includes("Already Verified")) {
      console.log(`ℹ️  Already verified: ${address}`);
    } else {
      console.error(`❌ Failed to verify ${address}:`, e.message);
    }
  }
}

async function main() {
  const deployer = (await ethers.getSigners())[0];
  const timelockAddr = ADDRESSES.MECCATimelockController;
  const minDelay = 2 * 24 * 3600;

  await verify(ADDRESSES.MECCAToken, [deployer.address]);
  await verify(ADDRESSES.MECCATimelockController, [minDelay, [], [ethers.ZeroAddress], deployer.address]);
  await verify(ADDRESSES.MECCAGovernor, [ADDRESSES.MECCAToken, timelockAddr]);
  await verify(ADDRESSES.MECCATreasury, [timelockAddr]);
  await verify(ADDRESSES.MECCANFTMembership, [timelockAddr]);
  await verify(ADDRESSES.MECCAStaking, [ADDRESSES.MECCAToken, timelockAddr]);
  await verify(ADDRESSES.MECCAPhilanthropyVault, [timelockAddr]);
}

main().catch((e) => { console.error(e); process.exitCode = 1; });
