const path = require("path");

const fs = require("fs");
const solc = require("solc");
const fsExtra = require("fs-extra");

function solcCompiler() {
  console.log("compiler starting ...");

  const inboxPath = process.cwd() + "/mycontracts/contracts/mySmart.sol";

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
    console.log("writeOutput1 ");
    fsExtra.ensureDirSync(buildPath);
    console.log("writeOutput2");
    console.log("compiled.contracts", compiled);

    for (let contractFileName in compiled.contracts) {
      console.log("writeOutput3");
      if (contractFileName.includes(".sol")) {
        const contractName = contractFileName.replace(".sol", "");
        console.log("writeOutput4", contractName);
        console.log(
          "writeOutput5",
          path.resolve(buildPath, contractName + ".json")
        );
        console.log("writeOutput6");
        // fsExtra.outputJsonSync(
        //   buildPath + contractName + ".json",
        //   JSON.stringify(compiled.contracts[contractFileName])
        // );
        fsExtra.writeJsonSync(
          buildPath + contractName + ".json",
          JSON.stringify(compiled.contracts[contractFileName])
        );
        console.log("Writing finished ");
      }
    }
  }
  console.log("starting to compile");
  let compiledJson = JSON.parse(solc.compile(JSON.stringify(input)));
  console.log("compile");
  const buildPath = process.cwd() + "/mycontracts/build/";

  console.log("buildPath is", buildPath);
  writeOutput(compiledJson, buildPath);
  console.log("compile saved");
}

module.exports = { solcCompiler };
