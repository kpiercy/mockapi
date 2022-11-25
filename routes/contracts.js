require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const contractsDto = require('../dto/contracts')

//child routes
const priceRoutes = require("./prices");

//controller
const dboperations = require("../controllers/contracts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled
router.use("/:contractid/prices", priceRoutes);

//get all contracts for this job
router.get("/", checkReach, dboperations.all_contracts);

//get single contract for this job by id
router.get("/:contractid", checkReach, dboperations.one_contract);

//update single contract for this job by id
router.patch("/:contractid", checkReach, dboperations.update_contract);

//create new contract by job
router.post("/", checkReach, validateDto(contractsDto), dboperations.create_contract);

//delete contract for this job
router.delete("/:contractid", checkReach, authLvl, dboperations.delete_contract);

module.exports = router;
