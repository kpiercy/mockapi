require("dotenv").config();

const configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const all_returns = async (req, res) => {
  console.log("dbops_returns.all_returns was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const one_return = async (req, res) => {
  console.log("dbops_returns.one_return was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const create_return = async (req, res) => {
  console.log("dbops_returns.create_return was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const delete_return = async (req, res) => {
  console.log("dbops_returns.delete_return was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

const update_return = async (req, res) => {
  console.log("dbops_returns.delete_return was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

module.exports = {
  all_returns,
  one_return,
  create_return,
  update_return,
  delete_return,
};
