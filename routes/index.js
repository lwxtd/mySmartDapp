var express = require("express");
var router = express.Router();
const compile = require("./../mycontracts/solcCompiler.js");
const fsExtra = require("fs-extra");
var fs = require("fs");
const path = require("path");
// /* GET home page. */
// router.get("/", function (req, res, next) {
//   res.render("index", { title: "Express" });
// });

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index");
});
/* GET home page. */
router.get("/api/v1/test", function (req, res, next) {
  res.send("Test Hello");
});

router.post("/users", function (req, res, next) {
  console.log("body isss not", req.body.firstName);
  res.send(req.query.firstName);
});
router.get("/test", function (req, res, next) {
  res.send("body isss not");
});
router.get("/test2", function (req, res, next) {
  let data = {
    "process.cwd() is ===>": process.cwd(),
    "path.join(process.cwd(), /tmp/mycontracts/contracts/mySmart.sol) is ===> ":
      path.join(process.cwd(), "/tmp/mycontracts/contracts/mySmart.sol"),
  };
  res.send(data);
});
router.get("/test3", function (req, res, next) {
  let data = {
    "process.cwd() is ===>": process.cwd(),
  };
  res.send(data);
});
router.get("/test4", function (req, res, next) {
  let data = {
    "path.join(process.cwd(), /tmp/mycontracts/contracts/mySmart.sol) is ===>":
      path.join(process.cwd(), "/tmp/mycontracts/contracts/mySmart.sol"),
  };
  res.send(data);
});
router.get("/test5", function (req, res, next) {
  let data = {
    __dir__: __dir__,
  };
  res.send(data);
});
router.post("/getcontractdata", function (req, res, next) {
  var obj = JSON.parse(
    fsExtra.readJsonSync("/tmp/mycontracts/build/mySmart.json", "utf8")
  );

  let data = {
    abi: obj.MySmart.abi,
    bytecode: obj.MySmart.evm.bytecode.object,
  };
  res.json(data);
});

router.post(
  "/api/v1/getContractinit",
  function (req, res, next) {
    let att = req.body.cnt;
    let ad1def = "address  payable add1=payable(" + att[0] + ");";
    let ad2def = "address  payable add2=payable(" + att[2] + ");";
    let ad3def = att[4] ? "address  payable add3=payable(" + att[4] + ");" : "";
    let ad4def = att[6] ? "address  payable add4=payable(" + att[6] + ");" : "";
    let ad5def = att[8] ? "address  payable add5=payable(" + att[8] + ");" : "";

    let un1def = "uint immutable  rat1=" + +att[1] + ";";
    let rat1def = "add1.transfer(msg.value*" + att[1] + "/100);";
    let un2def = "uint immutable  rat2=" + +att[3] + ";";
    let rat2def = "add2.transfer(msg.value*" + att[3] + "/100);";
    let un3def = att[5] ? "uint immutable  rat3=" + +att[5] + ";" : "";
    let rat3def = att[5] ? "add3.transfer(msg.value*" + att[5] + "/100);" : "";
    let un4def = att[7] ? "uint immutable  rat4=" + +att[7] + ";" : "";
    let rat4def = att[7] ? "add4.transfer(msg.value*" + att[7] + "/100);" : "";
    let un5def = att[9] ? "uint immutable  rat5=" + +att[9] + ";" : "";
    let rat5def = att[9] ? "add5.transfer(msg.value*" + att[9] + "/100);" : "";
    console.log(ad5def);
    let contractText = `// SPDX-License-Identifier: GPL-3.0
pragma solidity = 0.8.26;
contract MySmart {
    uint256 number;
    address  payable owner;
    ${ad1def}
    ${ad2def}
    ${ad3def}
    ${ad4def}
    ${ad5def}
    ${un1def}
    ${un2def}
    ${un3def}
    ${un4def}
    ${un5def}
    constructor(){
    owner=payable (msg.sender);
  }
receive() external payable {
    ${rat1def}
    ${rat2def}
    ${rat3def}
    ${rat4def}
    ${rat5def}
}
}`;

    console.log("contractText issss", contractText);
    fs.writeFile(
      process.cwd() + "/mycontracts/contracts/mySmart.sol",
      contractText,
      (err) => {
        if (err) {
          console.error(err);
        } else {
          let ff = compile.solcCompiler();

          console.log("file saved");

          var obj = JSON.parse(
            fsExtra.readJsonSync(
              process.cwd() + "/mycontracts/build/mySmart.json",
              "utf8"
            )
          );

          let data = {
            abi: obj.MySmart,
          };
          let dateAppend = new Date();
          fs.appendFile(
            "./mycontracts/myproject.sol",
            "\n" +
              "compiled " +
              dateAppend.toISOString() +
              "\n" +
              req.get("user-agent"),
            function (err) {
              if (err) throw err;
              console.log("file saved");
              res.send("File have been saved");
            }
          );
          res.json(data);
        }
      }
    );
  }

  // var obj = JSON.parse(
  //   fsExtra.readJsonSync("./mycontracts/build/mySmart.json", "utf8")
  // );

  // let data = {
  //   abi: obj.MySmart.abi,
  //   bytecode: obj.MySmart.evm.bytecode.object,
  // };
  // res.json(data);
);

router.post("/api/v1/getcontractdata", function (req, res, next) {
  var obj = JSON.parse(
    fsExtra.readJsonSync("/mycontracts/build/mySmart.json", "utf8")
  );

  let data = {
    abi: obj.MySmart.abi,
    bytecode: obj.MySmart.evm.bytecode.object,
  };
  res.json(data);
});

router.post("/getallcontractdata", function (req, res, next) {
  var obj = JSON.parse(
    fsExtra.readJsonSync("./mycontracts/build/mySmart.json", "utf8")
  );

  let data = {
    abi: obj.MySmart,
  };
  res.json(data);
});

//============== creating a file
router.get("/createsolfile", function (req, res, next) {
  fs.appendFile("./mycontracts/myproject.sol", "hello file", function (err) {
    if (err) throw err;
    console.log("file saved");
    res.send("File have been saved");
  });
});

router.get("/readsolfile", function (req, res, next) {
  var obj = JSON.parse(
    fsExtra.readJsonSync("./mycontracts/build/mySmart.json", "utf8")
  );

  let data = {
    abi: obj.MySmart.abi,
    bytecode: obj.MySmart.evm.bytecode.object,
  };
  res.json(data);
});

router.get("/injectsolfile", function (req, res, next) {
  fs.appendFile(
    "./mycontracts/myproject.sol",
    "This is my textdddd",
    function (err) {
      if (err) throw err;
      console.log("Replaced!");
      res.send("replaced");
    }
  );
});
router.get("/compilesolfile", function (req, res, next) {
  // console.log("starting ...");
  let ff = compile.solcCompiler();

  // console.log("Endedsddddddd");
  res.json({ dat: ff });
});

module.exports = router;
