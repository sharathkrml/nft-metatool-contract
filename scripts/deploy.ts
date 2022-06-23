import { ethers } from "hardhat";
import { MetaToolNFT__factory } from "../typechain";
async function main() {
  const signers = await ethers.getSigners();
  const MetaToolNFT = await new MetaToolNFT__factory(signers[0]).deploy();

  await MetaToolNFT.deployed();

  console.log("MetaToolNFT deployed to:", MetaToolNFT.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
