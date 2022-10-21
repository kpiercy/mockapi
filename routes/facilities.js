require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/dbops_facilities");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all facilities for this job
router.get("/", checkReach, dboperations.all_facilities);

//get single facilitie for this job by id
router.get("/:facilityid", checkReach, dboperations.one_facility);

//update single facilitie for this job by id
router.put("/:facilityid", checkReach, dboperations.update_facility);

//create new facilitie by job
router.post("/", checkReach, dboperations.create_facility);

//delete facilitie for this job
router.delete("/:facilityid", checkReach, authLvl, dboperations.delete_facility);

module.exports = router;
