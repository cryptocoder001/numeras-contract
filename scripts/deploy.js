// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const { ethers } = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // signer
  const [deployer] = await ethers.getSigners();

  // let wallet1 = new ethers.Wallet(process.env.PRIVATEKEY1);
  // let wallet2 = new ethers.Wallet(process.env.PRIVATEKEY2);
  // let wallet3 = new ethers.Wallet(process.env.PRIVATEKEY3);
  // let wallet4 = new ethers.Wallet(process.env.PRIVATEKEY4);

  // FSWL deploy

  const Fswl = await ethers.getContractFactory("FSWL");
  const fswl = await Fswl.deploy();
  await fswl.deployed();

  //SK1155Collection deploy
  const NumerasERC1155 = await ethers.getContractFactory("NumerasERC1155");
  const numerasERC1155 = await NumerasERC1155.deploy("FerrisWheel", "FSWL", deployer.address, fswl.address);
  await numerasERC1155.deployed();

  console.log("Fswl", fswl.address);
  console.log("erc1155", numerasERC1155.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
