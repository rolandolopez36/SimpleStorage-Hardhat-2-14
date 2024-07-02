// This is an asynchronous function named 'main' that will be used to deploy the contract.
async function main() {
  // 'getSigners' is a function that returns a list of accounts (signers) that can sign transactions.
  // Here we are getting the first account from that list and naming it 'deployer'.
  const [deployer] = await ethers.getSigners();

  // Log the address of the 'deployer' account to the console.
  console.log("Deploying contracts with the account:", deployer.address);

  // 'getBalance' is a function that returns the balance of the 'deployer' account in wei (smallest unit of ether).
  const balance = await deployer.getBalance();
  // Convert the balance to a string and log it to the console.
  console.log("Account balance:", balance.toString());

  // 'getContractFactory' is a function that returns a contract factory for a specific contract.
  // A contract factory is an abstraction to deploy new smart contracts.
  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  // Deploy the 'SimpleStorage' contract and wait for the deployment to finish.
  const simpleStorage = await SimpleStorage.deploy();

  // Log the address where the 'SimpleStorage' contract is deployed.
  console.log("Contract deployed to address:", simpleStorage.address);
}

// Call the 'main' function and handle any errors that occur.
// 'then' is called when the 'main' function completes successfully.
// 'catch' is called if there is an error during the execution of the 'main' function.
main()
  .then(() => process.exit(0)) // Exit the process successfully.
  .catch((error) => {
    // Handle any errors.
    console.error(error); // Log the error to the console.
    process.exit(1); // Exit the process with an error code.
  });
