require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/styles");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all styles for this job
//router.get("/", checkReach, dboperations.all_styles);

//get single style for this job by id
router.get("/:styleid", checkReach, dboperations.one_style);

//update existing based on provided fields or create if not found
router.patch("/:styleid", checkReach, dboperations.update_style);

//create new style by job
router.post("/", checkReach, authLvl, dboperations.create_style);

//delete style for this job
router.delete("/:styleid", checkReach, authLvl, dboperations.delete_style);

module.exports = router;
