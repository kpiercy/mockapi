require('dotenv').config()

const configJobData = require(`../config/db-${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql')
const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')

//file specific
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = '//DESKTOP-43BAVT3/SQLFilestream/Filestream/Specs_FS/logos'
    cb(null, `${path}`)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const id = uuid()
    const cid = req.params.clientid //setup for loop to handle numerous file uploads at once
    const jid = req.params.jobid
    cb(null, 'logos_' + `${cid}_${jid}_${id}${ext}`)
  },
})

//FILE OPTIONS
const logos = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, //5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype == 'image/png') {
      cb(null, true)
    } else {
      cb('Only .png formats are allowed!', false)
    }
  },
}).array('logos', 6)

const get_logos = async (req, res, next) => {
  console.log('dbops_logos.all_logos was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const get_logo = async (req, res, next) => {
  console.log('dbops_logos.one_logo was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const post_logo = async (req, res, next) => {
  logos(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return next(ApiError.internal(err))
    } else if (err) {
      return next(ApiError.internal(err))
    }
    //do insert call to tables with all relevant data, return data below
    //ISSUE: unable to retrieve req.body.file from postman for the filepath to use in stored proc var
    res.status(202).json(res.req.files)
  })
}

// const post_file = async (req, res, next) => {
//       try {
//       console.log(req.body.file);
//       let pool = await sql.connect(configJobData);
//       let logoFile = await pool
//         .request()
//         .input("path", sql.NVarChar, req.body.file)
//         .execute("PostFilestream");

//       res.status(200).json(logoFile.recordsets);

//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }

// };

const delete_logo = async (req, res, next) => {
  console.log('dbops_logos.delete_logo was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

module.exports = {
  get_logos,
  get_logo,
  post_logo,
  delete_logo,
}
