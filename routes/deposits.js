require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/dbops_deposits");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all deposits for this job
router.get("/", checkReach, dboperations.all_deposits);

//get single deposit for this job by id
router.get("/:depositid", checkReach, dboperations.one_deposit);

//update single deposit for this job by id
router.patch("/:depositid", checkReach, dboperations.update_deposit);

//create new deposit by job
router.post("/", checkReach, dboperations.create_deposit);

//delete deposit for this job
router.delete("/:depositid", checkReach, authLvl, dboperations.delete_deposit);

module.exports = router;
