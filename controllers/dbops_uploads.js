require("dotenv").config();

var configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_uploads = async (req, res) => {
  console.log("dbops_uploads.all_uploads was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const one_upload = async (req, res) => {
  console.log("dbops_uploads.one_upload was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const create_upload = async (req, res) => {
  console.log("dbops_uploads.create_upload was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const delete_upload = async (req, res) => {
  console.log("dbops_uploads.delete_upload was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

module.exports = {
  all_uploads,
  one_upload,
  create_upload,
  delete_upload,
};
