require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/logos");

//model


//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all logos
router.get("/", checkReach, dboperations.get_logos);

//get single logo by id
router.get("/:logoid", checkReach, dboperations.get_logo);

//create new logo
router.post("/", checkReach, authLvl, dboperations.post_logo);

//delete logo
router.delete("/:logoid", checkReach, authLvl, dboperations.delete_logo);

module.exports = router;
