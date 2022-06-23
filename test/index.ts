import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ContractTransaction } from "ethers";
import { ethers } from "hardhat";
import { MetaToolNFT__factory, MetaToolNFT } from "../typechain";
describe("MetaToolNFT", () => {
  let MetaToolNFT: MetaToolNFT;
  let owner: SignerWithAddress;
  let accounts: SignerWithAddress[];
  let txn: ContractTransaction;
  beforeEach(async () => {
    [owner, ...accounts] = await ethers.getSigners();
    MetaToolNFT = await new MetaToolNFT__factory(owner).deploy();
    await MetaToolNFT.deployed();
  });
  describe("Try minting", async () => {
    it("First mint", async () => {
      txn = await MetaToolNFT.mintOrUpdate("a");
      await txn.wait();
      const address = await MetaToolNFT.tokenURI(1);
      console.log(address);
      expect(await MetaToolNFT.balanceOf(owner.address)).to.equal(1);
    });
    it("Mint and Update", async () => {
      let uri = "hii";
      txn = await MetaToolNFT.mintOrUpdate(uri);
      await txn.wait();
      let id = await MetaToolNFT.ownedNft(owner.address);
      let uriReceived = await MetaToolNFT.tokenURI(id);
      expect(uri).to.equal(uriReceived);
      uri = "hellloo";
      txn = await MetaToolNFT.mintOrUpdate(uri);
      await txn.wait();

      let idNew = await MetaToolNFT.ownedNft(owner.address);
      expect(id).to.equal(idNew);

      uriReceived = await MetaToolNFT.tokenURI(idNew);
      expect(uri).to.equal(uriReceived);
    });
  });
});
