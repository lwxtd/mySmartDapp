var express = require("express");
var router = express.Router();
const compile = require("./../mycontracts/solcCompiler.js");
const fsExtra = require("fs-extra");
var fs = require("fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/users", function (req, res, next) {
  console.log("body isss not", req.body.firstName);
  res.send(req.query.firstName);
});

router.post("/getcontractdata", function (req, res, next) {
  var obj = JSON.parse(
    fsExtra.readJsonSync("./mycontracts/build/mySmart.json", "utf8")
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
