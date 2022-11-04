require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/processes");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all processes for this job
router.get("/", checkReach, dboperations.all_processes);

//get single processe for this job by id
router.get("/:processid", checkReach, dboperations.one_process);

//update existing based on provided fields or create if not found
router.patch("/:processid", checkReach, dboperations.update_process);

//create new processe by job
router.post("/", checkReach, authLvl, dboperations.create_processes);

//delete processe for this job
router.delete(
  "/:processeid",
  checkReach,
  authLvl,
  dboperations.delete_process
);

module.exports = router;
