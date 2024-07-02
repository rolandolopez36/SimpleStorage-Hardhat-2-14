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

2. Install Hardhat version 2.14.0 and its dependencies:

   ```bash
   npm install --save-dev hardhat@^2.14.0 --legacy-peer-deps
   ```

3. Install `@nomiclabs/hardhat-ethers` and `ethers`:

   ```bash
   npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0 --legacy-peer-deps
   ```

4. If necessary, install the `@nomicfoundation/hardhat-toolbox` module:

   ```bash
   npm install --save-dev @nomicfoundation/hardhat-toolbox --legacy-peer-deps
   ```

## Hardhat Configuration

Make sure your `hardhat.config.js` file is configured correctly. Here is an example:

```javascript
require("@nomiclabs/hardhat-ethers");

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
    // Configure other networks if necessary
  },
};
```

## Deployment Script

Create a file in the `scripts` directory, for example `scripts/deploy.js`, with the following content:

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

## Deploying to Sepolia

To deploy the contract to the Sepolia network, follow these steps:

1. Install the `dotenv` package to manage your environment variables:

   ```bash
   npm install dotenv
   ```

2. Create a `.env` file in the root of your project and add your Sepolia RPC URL and private key:

   ```
   SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/oKxs-03sij-U_N0iOlrSsZFr29-IqbuF
   PRIVATE_KEY=your_private_key_here
   ```

   Make sure to add `.env` to your `.gitignore` file to keep your private key secure:

   ```
   # .gitignore
   .env
   ```

3. Update your `hardhat.config.js` file to include the Sepolia network configuration:

   ```javascript
   require("@nomiclabs/hardhat-ethers");
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

4. Deploy the contract to Sepolia:

   ```bash
   npx hardhat run scripts/deploy.js --network sepolia
   ```

## Verify the Contract

To verify your contract on Sepolia, follow these steps:

1. Install the `hardhat-etherscan` plugin:

   ```bash
   npm install --save-dev @nomiclabs/hardhat-etherscan
   ```

2. Get your Etherscan API key from [Etherscan](https://etherscan.io/) (or [Sepolia Etherscan](https://sepolia.etherscan.io/)) and add it to your `.env` file:

   ```
   ETHERSCAN_API_KEY=your_etherscan_api_key_here
   ```

3. Update your `hardhat.config.js` to include the Etherscan plugin configuration:

   ```javascript
   require("@nomiclabs/hardhat-ethers");
   require("@nomiclabs/hardhat-etherscan");
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
     etherscan: {
       apiKey: process.env.ETHERSCAN_API_KEY,
     },
   };
   ```

4. Verify your contract using the following command, replacing `<CONTRACT_ADDRESS>` with the actual contract address:

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS>
   ```

   If your contract has constructor arguments, add them after the contract address:

   ```bash
   npx hardhat verify --network sepolia <CONTRACT_ADDRESS> <ARG1> <ARG2>
   ```

## License

This project is licensed under the MIT License.
