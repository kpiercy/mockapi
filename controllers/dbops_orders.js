require("dotenv").config();

var configJobData = require("../config/JobData_dbconfig");
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//get all orders for client by jobid
const all_orders = async (req, res) => {
  try {
    const jobid = req.params.jobid;
    let pool = await sql.connect(configJobData);
    let getOrders = await pool
      .request()
      .input("jobid", sql.NVarChar, jobid.toLowerCase())
      .execute("GetOrders");

    res
      .status(200)
      .json(
        JSON.parse(
          getOrders.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//get one order by orderid
const one_order = async (req, res) => {
  try {
    const orderid = req.params.orderid;
    let pool = await sql.connect(configJobData);
    let getOrder = await pool
      .request()
      .input("orderid", sql.NVarChar, orderid.toLowerCase())
      .execute("GetOrder");

    res
      .status(200)
      .json(
        JSON.parse(
          getOrder.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//updates fields to values provided or leaves field value as is if field is not provided in req.body, will also create a record if one is not found
const update_order = async (req, res) => {
  try {
    const orders = JSON.stringify(req.body);
    const orderid = req.params.orderid;
    let pool = await sql.connect(configJobData);
    let getOrders = await pool
      .request()
      .input("orders", sql.NVarChar, orders)
      .input("orderid", sql.NVarChar, orderid.toLowerCase())
      .execute("PutOrders");

    res.status(200).json(getOrders.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//create order
const create_order = async (req, res) => {
  try {
    const orders = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postOrders = await pool
      .request()
      .input("orders", sql.NVarChar, orders)
      .execute("PostOrders");

    res.status(201).json(postOrders.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

//deactivate order
const delete_order = async (req, res) => {
  try {
    const orderid = req.params.orderid;
    let pool = await sql.connect(configJobData);
    let delOrder = await pool
      .request()
      .input("orderid", sql.NVarChar, orderid.toLowerCase())
      .execute("DeleteOrder");

    res.status(200).json(delOrder.recordsets);
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  all_orders,
  one_order,
  update_order,
  create_order,
  delete_order,
};
