require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require("../middleware/validateDto");
const facilityDto = require("../dto/facilities");

//child routes
const specRoutes = require("./specs")

//controller
const dboperations = require("../controllers/facilities");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use('/:facilityid/specs', specRoutes)

//get all facilities for this job
router.get("/", checkReach, dboperations.all_facilities);

//get single facilitie for this job by id
router.get("/:facilityid", checkReach, dboperations.one_facility);

//update single facilitie for this job by id
router.patch("/:facilityid", checkReach, dboperations.update_facility);

//create new facilitie by job
router.post("/", checkReach, validateDto(facilityDto), dboperations.create_facility);

//delete facilitie for this job
router.delete("/:facilityid", checkReach, authLvl, dboperations.delete_facility);

module.exports = router;
