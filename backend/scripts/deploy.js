const hre = require("hardhat");

async function main() {
  const ReportChain = await hre.ethers.getContractFactory("ReportChain");
  const reportChain = await ReportChain.deploy();
  await reportChain.deployed();

  console.log(`✅ ReportChain deployed to: ${reportChain.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
