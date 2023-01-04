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

//GetOne
router.get("/:chartid", checkReach, dboperations.one_chart);

//PatchOne
router.patch("/:chartid", checkReach, dboperations.update_chart);

//Post
router.post("/", checkReach, authLvl, dboperations.create_chart);

//DeleteOne
router.delete("/:chartid", checkReach, authLvl, dboperations.delete_chart);

module.exports = router;
