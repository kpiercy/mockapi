require("dotenv").config();

const express = require("express");
const router = express.Router({ mergeParams: true });
const pubip = require("express-ip");

//additional middleware
const authLvl = require("../middleware/authLvl");
const checkReach = require("../middleware/reachlimiter");

//child routes


//controller
const dboperations = require("../controllers/dbops_uploads");

//model

//router options and children
router.use(pubip().getIpInfoMiddleware);
//router.all('*', publimiter, authenticateToken, authAccess, authIP) //instantiated by clients parent router and called once url is reconciled

//get all uploads, paginate
router.get("/", checkReach, dboperations.all_uploads);

//get single upload by id
router.get("/:id", checkReach, dboperations.one_upload);

//create new upload
router.post("/", checkReach, authLvl, dboperations.create_upload);

//delete upload
router.delete("/", checkReach, authLvl, dboperations.delete_upload);

module.exports = router;
