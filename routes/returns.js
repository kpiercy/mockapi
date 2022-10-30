require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes


//controller
const dboperations = require("../controllers/dbops_returns");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//create new return
router.post("/", checkReach, authLvl, dboperations.create_return);

//get all returns, paginate
router.get("/", checkReach, dboperations.all_returns);

//get single return by id
router.get("/:returnid", checkReach, dboperations.one_return);

//update return
router.patch("/:returnid", checkReach, authLvl, dboperations.update_return);

//delete return
router.delete("/:returnid", checkReach, authLvl, dboperations.delete_return);

module.exports = router;
