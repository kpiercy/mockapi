require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/charts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all charts for this job
//router.get("/", checkReach, dboperations.all_charts);

//get single chart for this job by id
router.get("/:chartid", checkReach, dboperations.one_chart);

//update existing based on provided fields or create if not found
router.patch("/:chartid", checkReach, dboperations.update_chart);

//create new chart by job
router.post("/", checkReach, authLvl, dboperations.create_chart);

//delete chart for this job
router.delete("/:chartid", checkReach, authLvl, dboperations.delete_chart);

module.exports = router;
