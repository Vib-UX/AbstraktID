// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  // console.log("Account balance:", (await deployer.getBalance()).toString());

  // Deploy USDC contract
  const USDC = await hre.ethers.getContractFactory("USDC");
  const usdc = await USDC.deploy("1000000000000000000000000"); // Initial supply of 1 million with 18 decimals
  // await usdc.deployed();
  console.log("USDC contract deployed to:", usdc.target);

  // Deploy VehicleDocument contract
  const VehicleDocument = await hre.ethers.getContractFactory(
    "VehicleDocument"
  );
  const vehicleDocument = await VehicleDocument.deploy(deployer.address); // Setting the deployer as the initial owner
  // await vehicleDocument.deployed();
  console.log("VehicleDocument contract deployed to:", vehicleDocument.target);

  // Deploy VehicleLoanContract
  const VehicleLoanContract = await hre.ethers.getContractFactory(
    "VehicleLoanContract"
  );
  const vehicleLoanContract = await VehicleLoanContract.deploy(
    usdc.target,
    vehicleDocument.target
  );
  // await vehicleLoanContract.deployed();
  console.log("VehicleLoanContract deployed to:", vehicleLoanContract.target);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
