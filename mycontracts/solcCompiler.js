const path = require("path");

const fs = require("fs");
const solc = require("solc");
const fsExtra = require("fs-extra");

function solcCompiler() {
  console.log("compiler starting ...");

  const inboxPath = path.resolve(__dirname, "contracts", "mySmart.sol");
  console.log(inboxPath);
  const source = fs.readFileSync(inboxPath, "utf8");

  const input = {
    language: "Solidity",
    sources: {
      "mySmart.sol": {
        content: source,
      },
    },
    settings: {
      evmVersion: "petersburg",
      outputSelection: {
        "*": {
          "*": ["*"],
        },
      },
    },
  };

  /**
   * Writes the contracts from the compiled sources into JSON files, which you will later be able to
   * use in combination with web3.
   * @param compiled - Object containing the compiled contracts.
   * @param buildPath - Path of the build folder.
   */
  function writeOutput(compiled, buildPath) {
    fsExtra.ensureDirSync(buildPath);
    for (let contractFileName in compiled.contracts) {
      if (contractFileName.includes(".sol")) {
        const contractName = contractFileName.replace(".sol", "");
        fsExtra.outputJsonSync(
          path.resolve(buildPath, contractName + ".json"),
          JSON.stringify(compiled.contracts[contractFileName])
        );
        console.log("Writing finished ");
      }
    }
  }

  let compiledJson = JSON.parse(solc.compile(JSON.stringify(input)));
  console.log("dddddd", compiledJson);

  const buildPath = path.resolve(__dirname, "build");
  writeOutput(compiledJson, buildPath);
}

module.exports = { solcCompiler };
