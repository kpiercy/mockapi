require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes
const paychanRoutes = require("./paychannels")
const messageRoutes = require("./messages")
const styleRoutes = require("./styles")

//controller
const dboperations = require("../controllers/layouts");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use("/:layoutid/paychannels", paychanRoutes)
router.use("/:layoutid/messages", messageRoutes)
router.use("/:layoutid/styles", styleRoutes)

//get all layouts for this job
//router.get("/", checkReach, dboperations.all_layouts);

//get single layout for this job by id
router.get("/:layoutid", checkReach, dboperations.one_layout);

//update existing based on provided fields or create if not found
router.patch("/:layoutid", checkReach, dboperations.update_layout);

//create new layout by job
router.post("/", checkReach, authLvl, dboperations.create_layout);

//delete layout for this job
router.delete("/:layoutid", checkReach, authLvl, dboperations.delete_layout);

module.exports = router;
