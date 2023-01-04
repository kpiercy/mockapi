require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const reportDto = require('../schemas/reports')

//child routes

//controller
const dboperations = require("../controllers/reports");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get single report for this job by id
router.get("/:reportid", checkReach, dboperations.one_report);

//delete report for this job
router.delete("/:reportid", checkReach, authLvl, dboperations.delete_report);

module.exports = router;
