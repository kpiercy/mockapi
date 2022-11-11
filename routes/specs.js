require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes
const groupRoutes = require("./groups")
const reportRoutes = require("./reports")
const filterRoutes = require("./filters")
const logoRoutes = require("./logos")
const chartRoutes = require("./charts")
const insertRoutes = require("./inserts")
const layoutRoutes = require("./layouts")

//controller
const dboperations = require("../controllers/specs");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
router.use("/:specid/groups", groupRoutes)
router.use("/:specid/reports", reportRoutes)
router.use("/:specid/filters", filterRoutes)
router.use("/:specid/logos", logoRoutes)
router.use("/:specid/charts", chartRoutes)
router.use("/:specid/inserts", insertRoutes)
router.use("/:specid/layouts", layoutRoutes)

//get all specs for this job
//router.get("/", checkReach, dboperations.all_specs);

//get single spec for this job by id
router.get("/:specid", checkReach, dboperations.one_spec);

//update existing based on provided fields or create if not found
router.patch("/:specid", checkReach, dboperations.update_spec);

//create new spec by job
router.post("/", checkReach, authLvl, dboperations.create_spec);

//delete spec for this job
router.delete("/:specid", checkReach, authLvl, dboperations.delete_spec);

module.exports = router;
