require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");
const validateDto = require('../middleware/validateDto')
const channelDto = require('../dto/channels')

//child routes

//controller
const dboperations = require("../controllers/paychannels");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all paychannels for this job
//router.get("/", checkReach, dboperations.all_paychannels);

//get single paychannel for this job by id
router.get("/:paychannelid", checkReach, dboperations.one_paychannel);

//update existing based on provided fields or create if not found
router.patch("/:paychannelid", checkReach, dboperations.update_paychannel);

//create new paychannel by job
router.post("/", checkReach, authLvl, validateDto(channelDto), dboperations.create_paychannel);

//delete paychannel for this job
router.delete("/:paychannelid", checkReach, authLvl, dboperations.delete_paychannel);

module.exports = router;
