require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const groupDto = require('../dto/groups')

//child routes

//controller
const dboperations = require("../controllers/groups");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all groups for this job
//router.get("/", checkReach, dboperations.all_groups);

//get single group for this job by id
router.get("/:groupid", checkReach, dboperations.one_group);

//update existing based on provided fields or create if not found
router.patch("/:groupid", checkReach, dboperations.update_group);

//create new group by job
router.post("/", checkReach, authLvl, validateDto(groupDto), dboperations.create_group);

//delete group for this job
router.delete("/:groupid", checkReach, authLvl, dboperations.delete_group);

module.exports = router;
