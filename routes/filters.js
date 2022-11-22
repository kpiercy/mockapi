require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const filterDto = require('../dto/filters')

//child routes

//controller
const dboperations = require("../controllers/filters");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all filters for this job
router.get("/", checkReach, dboperations.all_filters);

//get single filter for this job by id
router.get("/:filterid", checkReach, dboperations.one_filter);

//update existing based on provided fields or create if not found
router.patch("/:filterid", checkReach, dboperations.update_filter);

//create new filter by job
router.post("/", checkReach, authLvl, validateDto(filterDto), dboperations.create_filter);

//delete filter for this job
router.delete("/:filterid", checkReach, authLvl, dboperations.delete_filter);

module.exports = router;
