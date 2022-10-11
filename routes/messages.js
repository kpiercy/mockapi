require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes

//controller
const dboperations = require("../controllers/dbops_messages");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all messages
router.get("/", checkReach, dboperations.get_messages);

//get single message by id
router.get("/:messageid", checkReach, dboperations.get_message);

//create new message
router.post("/", checkReach, authLvl, dboperations.post_message);

//delete message
router.delete("/", checkReach, authLvl, dboperations.delete_message);

module.exports = router;
