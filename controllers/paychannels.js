require("dotenv").config();

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const sql = require("mssql/msnodesqlv8");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const one_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    let pool = await sql.connect(configJobData);
    let getPaychannel = await pool
      .request()
      .input("paychannelid", sql.NVarChar, paychannelid.toLowerCase())
      .execute("GetPaychannel");

    res
      .status(200)
      .json(
        JSON.parse(
          getPaychannel.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const create_paychannel = async (req, res) => {
  try {
    const paychannels = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let postPaychannel = await pool
      .request()
      .input("channels", sql.NVarChar, paychannels)
      .execute("PostPaychannels");

    res.status(201).json({ Channels: postPaychannel.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const update_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    const paychannels = JSON.stringify(req.body);
    let pool = await sql.connect(configJobData);
    let putPaychannel = await pool
      .request()
      .input("paychannels", sql.NVarChar, paychannels)
      .input("paychannelid", sql.VarChar, paychannelid.toLowerCase())
      .execute("PutPaychannels");

    res.status(200).json({ Channels: putPaychannel.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const delete_paychannel = async (req, res) => {
  try {
    const paychannelid = req.params.paychannelid;
    let pool = await sql.connect(configJobData);
    let deleted = await pool
      .request()
      .input("paychannelid", sql.VarChar, paychannelid.toLowerCase())
      .execute("DeletePaychannel");

    res.status(200).json({ Channels: deleted.recordset });
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

module.exports = {
  //all_paychannels,
  one_paychannel,
  create_paychannel,
  update_paychannel,
  delete_paychannel,
};
