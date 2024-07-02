# Sample Hardhat Project

This project demonstrates a basic Hardhat use case. It comes with a sample contract, a test for that contract, and a script that deploys that contract.

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
REPORT_GAS=true npx hardhat test
npx hardhat node
npx hardhat run scripts/deploy.js
```

.-----------------------------------------------------

# SimpleStorage Project

Este proyecto es un ejemplo básico de cómo compilar y desplegar un contrato inteligente utilizando Hardhat.

## Prerrequisitos

- Node.js (v12 o superior)
- npm (v6 o superior)

## Instalación

1. Clona este repositorio y navega al directorio del proyecto:

   ```bash
   git clone <URL_DEL_REPOSITORIO>
   cd SimpleStorage
   ```

2. Instala Hardhat versión 2.14.0 y sus dependencias:

   ```bash
   npm install --save-dev hardhat@^2.14.0 --legacy-peer-deps
   ```

3. Instala `@nomiclabs/hardhat-ethers` y `ethers`:

   ```bash
   npm install --save-dev @nomiclabs/hardhat-ethers ethers@^5.0.0 --legacy-peer-deps
   ```

4. Si es necesario, instala el módulo `@nomicfoundation/hardhat-toolbox`:
   ```bash
   npm install --save-dev @nomicfoundation/hardhat-toolbox --legacy-peer-deps
   ```

## Configuración de Hardhat

Asegúrate de que tu archivo `hardhat.config.js` esté configurado correctamente. Aquí hay un ejemplo:

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
    // Configura otras redes si es necesario
  },
};
```

## Script de Despliegue

Crea un archivo en el directorio `scripts`, por ejemplo `scripts/deploy.js`, con el siguiente contenido:

```javascript
async function main() {
  const [deployer] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);

  const balance = await deployer.getBalance();
  console.log("Account balance:", balance.toString());

  const SimpleStorage = await ethers.getContractFactory("SimpleStorage");
  const simpleStorage = await SimpleStorage.deploy();

  console.log("Contract deployed to address:", simpleStorage.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

## Compilar el Contrato

Para compilar el contrato, ejecuta el siguiente comando:

```bash
npx hardhat compile
```

## Desplegar el Contrato

Para desplegar el contrato, ejecuta el siguiente comando:

```bash
npx hardhat run scripts/deploy.js --network hardhat
```

## Licencia

Este proyecto está licenciado bajo la licencia MIT.
