require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/dbops_credits");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all credits for this job
router.get("/", checkReach, dboperations.all_credits);

//get single credit for this job by id
router.get("/:creditid", checkReach, dboperations.one_credit);

//update single credit for this job by id
router.put("/:creditid", checkReach, dboperations.update_credit);

//create new credit by job
router.post("/", checkReach, dboperations.create_credit);

//delete credit for this job
router.delete("/:creditid", checkReach, authLvl, dboperations.delete_credit);

module.exports = router;
