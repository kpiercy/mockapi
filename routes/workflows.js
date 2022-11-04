require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/workflows");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all workflows for this job
router.get("/", checkReach, dboperations.all_workflows);

//get single workflow for this job by id
router.get("/:workflowid", checkReach, dboperations.one_workflow);

//update existing based on provided fields or create if not found
router.patch("/:workflowid", checkReach, dboperations.update_workflow);

//create new workflow by job
router.post("/", checkReach, authLvl, dboperations.create_workflow);

//delete workflow for this job
router.delete("/:workflowid", checkReach, authLvl, dboperations.delete_workflow);

module.exports = router;
