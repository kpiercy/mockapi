require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require("uuid").v4;
const multer = require("multer");
const path = require("path");


//file specific
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let type = req.params.type
        let path =
          "//DESKTOP-43BAVT3/SQLFilestream/Filestream/Specs_FS/filestoprocess"
        cb(null, `${path}`)
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        const id = uuid()
        const cid = req.params.clientid //setup for loop to handle numerous file uploads at once
        const jid = req.params.jobid;
        cb(null, `${cid}_${jid}_${id}${ext}`)
     }
})

//set filters for each type of file and return error when non-allowable filetype is sent
const filestoprocess = multer({ 
    storage: storage,
    limits:  { fileSize: 5 * 1024 * 1024 }, //5MB
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "application/vnd.ms-excel" || 
        file.mimetype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || 
        file.mimetype == "application/zip" || file.mimetype == "text/plain" || 
        file.mimetype == "application/pdf" || file.mimetype == "application/json" || 
        file.mimetype == "text/csv") {
                cb(null, true);
              } else {
                cb('Only .txt, .csv, .pdf, .xls, .xlsx, .zip, & .json formats are allowed!', false);
              }       
      }
}).array('filestoprocess', 6)

const get_files = async (req, res, next) => {
    console.log('dbops_files.all_files was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const get_file = async (req, res, next) => {
    console.log('dbops_files.one_file was reached')
    console.log('Clientid used: '+req.params.clientid)
    console.log('Jobid used: '+req.params.jobid)
}

const post_file = async (req, res, next) => {
  filestoprocess(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(ApiError.internal(err))
    } else if (err) {
      return next(ApiError.internal(err))
    }
    //do insert call to tables with all relevant data, return data below
    //ISSUE: unable to retrieve req.body.file from postman for the filepath to use in stored proc var
    res.status(202).json(res.req.files);
  })
}

// const post_file = async (req, res, next) => {
//       try {
//       console.log(req.body.file);
//       let pool = await sql.connect(configJobData);
//       let insertFile = await pool
//         .request()
//         .input("path", sql.NVarChar, req.body.file)
//         .execute("PostFilestream");

//       res.status(200).json(insertFile.recordsets);

//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }
  
// };

const delete_file = async (req, res, next) => {
  console.log("dbops_files.delete_file was reached");
  console.log("Clientid used: " + req.params.clientid);
  console.log("Jobid used: " + req.params.jobid);
};

module.exports = {
    get_files,
    get_file,
    post_file,
    delete_file
}