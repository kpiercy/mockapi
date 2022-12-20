require('dotenv').config()

const configJobData = require('../config/JobData_dbconfig');
const sql = require('mssql/msnodesqlv8');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

//model
//const model = require('../models/user')

const create_users = async (req, res) => {
  try {
    const user = req.body.Users;
    for (let i = 0; i < user.length; i++) {
      let username = user[i].Username;
      let pool = await sql.connect(configJobData);
      let findUser = await pool
        .request()
        .input("username", sql.VarChar, username)
        .execute("UserExists");
      let thisUser = findUser.recordset[0];

      if (thisUser != null) {
        throw Error( "username already taken" );
      } else {
        const hashedpassword = await bcrypt.hash(user[i].Password, 10);
        Object.assign(user[i], { hashedpassword: hashedpassword });
      }
    }
    const users = JSON.stringify(user);
    try {
      let pool = await sql.connect(configJobData);
      let insertUser = await pool
        .request()
        .input("users", sql.NVarChar, users)
        .execute("PostUsers");

      res.status(201).json({ Users: insertUser.recordset });
    } catch (e) {
      res.status(500).json({ Error: e.message });
      console.log(e);
    }
  } catch (e) {
    res.status(500).json({ Error: e.message });
    console.log(e);
  }
};

const user_auth = async (req,res) => {
    const password = req.body.password
    const username = req.body.username
    if (username == null || password == null) {
      return res.status(400).json({ Error: "Please enter proper credentials" });
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = { name: username, password: hashedPassword }
        try{
            let pool = await sql.connect(configJobData)
            let users = await pool.request()
                .input('username', sql.VarChar, username)  
                .execute('UserExists')
                    let thisUser = users.recordset[0].username
                    let thisPass = users.recordset[0].hashedpassword
                    let thisAccess = users.recordset[0].apiaccess
                    let thisClient = users.recordset[0].clientid
                    let thisParent = users.recordset[0].parent_clientid
                    let thisPerm = users.recordset[0].securityGrp;
                
            if ( await bcrypt.compare(req.body.password, thisPass) && thisUser === username) {
                 
                if ( thisAccess === true ) {
                        const accessToken = jwt.sign(
                          user,
                          process.env.ACCESS_TOKEN_SECRET,
                          { expiresIn: "30m" }
                        );
                        const refreshToken = jwt.sign(
                          user,
                          process.env.REFRESH_TOKEN_SECRET,
                          { expiresIn: "8hr" }
                        );
                        res.json({token: accessToken, accessExpiresIn: "30min", refreshToken: refreshToken, refreshExpiresIn: "8hrs", permissions: thisPerm, client: thisClient, parent: thisParent});
                        
                        let userUp = { usernm: req.body.username, refToken: refreshToken, accToken: accessToken}
                        try{
                            let pool = await sql.connect(configJobData);
                            let updateToken = await pool.request()
                                .input('usernm', sql.VarChar, userUp.usernm)
                                .input('refToken', sql.VarChar, userUp.refToken)
                                .input('accToken', sql.VarChar, userUp.accToken)
                                .execute('addTokens');
                    
                            //res.status(200).json(updateToken.recordsets);
                        }
                        catch (e){
                            res.status(500).json({ Error: e.message })
                            console.log(e);
                        }

                    } else {
                        res.status(403).json({ Error: 'User does not have API access at this time, please check with your admin and contact Elite Services if necessary' })
                    }
                } else {
                    res.status(403).json({ Error : 'Username or password incorrect' })
                }
        } catch (e) {
            res.status(500).json({ Error: e.message });
        }
}

const user_refresh = async (req,res) => {
        const refreshtoken = req.body.token
    if (refreshtoken == null) return res.sendStatus(401)

    try{
        let pool = await sql.connect(configJobData)
        let users = await pool.request()
            .input('refToken', sql.VarChar, refreshtoken)
            .execute('RefreshAccess')
        let thisRefTok = users.recordset[0].refreshtoken
        if ( thisRefTok === refreshtoken ){
                jwt.verify(refreshtoken, process.env.REFRESH_TOKEN_SECRET, async (err, user) => {
                    if (err) return res.sendStatus(403)
                    const accesstoken = jwt.sign({ name: user.username}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' })
                    res.status(201).json ({ accessToken: accesstoken })
    
                    let userUp = { refToken: refreshtoken, accToken: accesstoken}
                    try{
                        let pool = await sql.connect(configJobData);
                        let updateToken = await pool.request()
                            .input('refToken', sql.VarChar, userUp.refToken)
                            .input('accToken', sql.VarChar, userUp.accToken)
                            .execute('UpdateAccToken');
                
                        //return updateToken.recordsets;
                    }
                    catch (e){
                        res.status(500).json({ Error: e.message })
                        console.log(e);
                    }
                
                })
            } else {
                res.status(401).json({ Error: 'Refresh token does not match our records' })
            }

    } catch (e){
        res.status(500).json({ Error: e.message })
        consolee.log(e)
    }
}

const find_me = async (req,res) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    try{
        let pool = await sql.connect(configJobData)
        let permLvl = await pool.request()
            .input('token', sql.VarChar, token)
            .execute('GetUserMe')
            res.json(JSON.parse(permLvl.recordset[0]['JSON_F52E2B61-18A1-11d1-B105-00805F49916B']))
    } catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e)
    }
}

const find_user = async (req, res) => {
  try {
    const userid = req.params.userid;
    let pool = await sql.connect(configJobData);
    let getUser = await pool
      .request()
      .input("userid", sql.NVarChar, userid.toLowerCase())
      .execute("GetUser");

    res
      .status(200)
      .json(
        JSON.parse(
          getUser.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
      console.log(e)
      res.status(500).json({ Error: e.message })
  }
};

const find_users = async (req, res) => {
  try {
    let clientid = req.params.clientid;
    let pool = await sql.connect(configJobData);
    let users = await pool
      .request()
      .input("clientid", sql.NVarChar, clientid.toLowerCase())
      .execute("GetUsers");
    res
      .status(200)
      .json(
        JSON.parse(
          users.recordset[0]["JSON_F52E2B61-18A1-11d1-B105-00805F49916B"]
        )
      );
  } catch (e) {
    console.log(e)
    res.status(500).json({ Error: e.message })
  }
};

const update_user = async (req, res) => {
    try {
        let userid = req.params.userid
        let pool = await sql.connect(configJobData)
        let userUp = await pool
            .request()
            .input('userid', sql.NVarChar, userid)
            .execute('PutUser');
        res 
            .status(201)
            .json({ Users: userUp.recordset })
    } catch (e) {
        res.status(500).json({ Error: e.message });
        console.log(e);
    }
};

const delete_client_users = async (req,res) => {
    const client = req.body.clientid
    console.log('Clientid provided for RevokeAPIAccess call: '+client)
    try{
        let pool = await sql.connect(configJobData)
        let clients = await pool.request()
            .input('client', sql.VarChar, client)
            .execute('ClientExists')
            console.log('Records found by clientid that will now be disabled: '+clients.recordset[0]['count'])
        if( clients.recordset[0]['count'] > 0.5 ) {
            let pool2 = await sql.connect(configJobData)
            let revoke = await pool2.request()
                .input('client', sql.VarChar, client)
                .execute('RevokeUserAccess')
            res.status(202).json({ Users: revoke.recordset})
        } else{
            res.status(400).json('Error:No users by that clientid found.')
            }

    } catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}

const delete_user = async (req,res) => {
    const userid = req.params.userid
    try{
        let pool2 = await sql.connect(configJobData)
        let revoke = await pool2.request()
            .input('userid', sql.VarChar, userid)
            .execute('DeleteUser')
        res.status(202).json({ Users: revoke.recordsets})
    } catch (e) {
        res.status(500).json({ Error: e.message })
        console.log(e);
    }
}


module.exports = {
    user_auth,
    user_refresh,
    find_me,
    find_user,
    create_users,
    update_user,
    delete_client_users,
    delete_user,
    find_users
}