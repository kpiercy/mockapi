require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/dbops_prices");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all prices for this job
router.get("/", checkReach, dboperations.all_prices);

//get single price for this job by id
router.get("/:priceid", checkReach, dboperations.one_price);

//update single price for this job by id
router.patch("/:priceid", checkReach, dboperations.update_price);

//create new price by job
router.post("/", checkReach, dboperations.create_price);

//delete price for this job
router.delete("/:priceid", checkReach, authLvl, dboperations.delete_price);

module.exports = router;
