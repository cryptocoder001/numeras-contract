const { expect } = require("chai");
const { ethers } = require("hardhat");

let test;

describe("SK Tests", function () {
  this.beforeEach(async function () {
    [account1, account2, account3, account4] = await ethers.getSigners();

    const TEST = await ethers.getContractFactory("Test");

    test = await TEST.deploy(account1.address);
    await test.deployed();

    console.log("Marketplace Address: ", test.address);
  })

  it("UseCase105 Test", async function () {
    [
      account1, // admin key
      account2
    ] = await ethers.getSigners();

    console.log("account1", account1.address)

    let addItem = {
      collection: "0xc9db3b61eb85834cb5064d52e5cd1dca35c71b1c",
      tokenId: 1123,
      supply: 1,
      tokenURI: "https://base_uri/url/back.json",
      deadline: 1664582399,
      nonce: 0,
    };

    let messageHash = ethers.utils.solidityKeccak256(
      ["address", "uint256", "uint256", "string", "uint256"],
      [addItem.collection, addItem.tokenId, addItem.supply, addItem.tokenURI, addItem.deadline]
    );
    let signature = await account1.signMessage(ethers.utils.arrayify(messageHash));

    const tx = await test.connect(account2).verify(
      addItem.collection,
      addItem.tokenId,
      addItem.supply,
      addItem.tokenURI,
      addItem.deadline,
      signature
    );

    console.log("tx is", tx)
  })
});