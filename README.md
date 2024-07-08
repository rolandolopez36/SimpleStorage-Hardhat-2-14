# SimpleStorage Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

## Prerequisites

- Node.js (v12 or higher)
- npm (v6 or higher)

## Installation

1. Clone this repository and navigate to the project directory:

   ```bash
   git clone <REPOSITORY_URL>
   cd SimpleStorage
   ```

2. Install Hardhat and its dependencies:

   ```bash
   npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers chai chai-as-promised ethereum-waffle dotenv @nomicfoundation/hardhat-network-helpers
   ```

## Hardhat Configuration

Rename `hardhat.config.js` to `hardhat.config.cjs` and configure it as follows:

**`hardhat.config.cjs`**:

```javascript
require("@nomiclabs/hardhat-ethers");
require("@nomicfoundation/hardhat-network-helpers");
require("dotenv").config();

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.0",
      },
      {
        version: "0.8.9",
      },
    ],
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    sepolia: {
      url: process.env.SEPOLIA_URL,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
```

## Deployment Script

Create a file in the `scripts` directory, for example `scripts/deploy.js`, with the following content:

**`scripts/deploy.js`**:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  await simpleStorage.deployed();

  console.log("Contract deployed to address:", simpleStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Testing

Create a test file in the `test` directory, for example `test/SimpleStorage.js`, with the following content:

**`test/SimpleStorage.js`**:

```javascript
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
```

## Compile the Contract

To compile the contract, run the following command:

```bash
npx hardhat compile
```

## Deploy the Contract

To deploy the contract on the local Hardhat network, run the following command:

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

To deploy the contract to the Sepolia network, follow these steps:

1. Create a `.env` file in the root of your project and add your Sepolia RPC URL and private key:

   ```
   SEPOLIA_URL=your_sepolia_url_here
   PRIVATE_KEY=your_private_key_here
   ```

2. Deploy the contract to Sepolia:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## Run the Tests

To run the tests, use the following command:

```bash
npm run test
```

## License

This project is licensed under the MIT License.
