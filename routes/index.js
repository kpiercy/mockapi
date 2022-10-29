require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require('express-ip')

//middleware
const publimiter = require("../middleware/publimiter");
const authenticateToken = require("../middleware/authToken");
const authLvl = require("../middleware/authLvl"); // pass on routes that can only be hit internally
const authAccess = require("../middleware/access");
const authIP = require("../middleware/ipAccess");
const checkReach = require("../middleware/reachlimiter"); //pass on routes that need query reach limited to only their client (bypasses check if user is internal)

//controller


//child routes

//router options and children
router.use(pubip().getIpInfoMiddleware)
router.all('*', publimiter, authenticateToken, authAccess, authIP)

//get all clients by clientid, will paginate in case of parent-child relations, will otherwise return single client in pagination form
router.get("/", checkReach, (req, res) => {
    res.render("index", { title: "Express" })
})

module.exports = router;
