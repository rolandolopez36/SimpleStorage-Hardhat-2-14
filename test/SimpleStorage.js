import { expect } from "chai";
import hardhat from "hardhat";

const { ethers } = hardhat;

describe("SimpleStorage", function () {
  let SimpleStorage, simpleStorage;

  beforeEach(async function () {
    SimpleStorage = await ethers.getContractFactory("SimpleStorage");
    simpleStorage = await SimpleStorage.deploy();
    await simpleStorage.deployed();
  });

  describe("setNumber", function () {
    it("Should set the storedNumber correctly", async function () {
      await simpleStorage.setNumber(42);
      const storedNumber = await simpleStorage.storedNumber();
      expect(storedNumber.toString()).to.equal("42");
    });

    it("Should overwrite the previous number", async function () {
      await simpleStorage.setNumber(42);
      let storedNumber = await simpleStorage.storedNumber();
      expect(storedNumber.toString()).to.equal("42");

      await simpleStorage.setNumber(100);
      storedNumber = await simpleStorage.storedNumber();
      expect(storedNumber.toString()).to.equal("100");
    });
  });

  describe("getNumber", function () {
    it("Should return the correct storedNumber", async function () {
      await simpleStorage.setNumber(42);
      const storedNumber = await simpleStorage.getNumber();
      expect(storedNumber.toString()).to.equal("42");
    });

    it("Should return zero if no number has been set", async function () {
      const storedNumber = await simpleStorage.getNumber();
      expect(storedNumber.toString()).to.equal("0");
    });
  });
});
