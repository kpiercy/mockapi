require('dotenv').config()

const configJobData = require(`../config/${process.env.NODE_ENV}`)
const { baseUrl } = require(`../config/${process.env.NODE_ENV}`)
const ApiError = require('../utils/api-error')
const sql = require('mssql/msnodesqlv8')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const uuid = require('uuid').v4
const multer = require('multer')
const path = require('path')

//file specific
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let path = '//DESKTOP-43BAVT3/SQLFilestream/Filestream/Specs_FS/messages'
    cb(null, `${path}`)
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const id = uuid()
    const cid = req.params.clientid //setup for loop to handle numerous file uploads at once
    const jid = req.params.jobid
    cb(null, 'messages_' + `${cid}_${jid}_${id}${ext}`)
  },
})

//set filters for each type of file and return error when non-allowable filetype is sent
const messages = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, //2MB
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
      file.mimetype == 'application/msword' ||
      file.mimetype == 'application/pdf'
    ) {
      cb(null, true)
    } else {
      cb('Only .pdf, .doc & .docx formats are allowed for /messages route!', false)
    }
  },
}).array('messages', 6)

const get_messages = async (req, res, next) => {
  console.log('dbops_messages.all_messages was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const get_message = async (req, res, next) => {
  console.log('dbops_messages.one_message was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

const post_message = async (req, res, next) => {
  messages(req, res, function (err) {
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
//       let messageFile = await pool
//         .request()
//         .input("path", sql.NVarChar, req.body.file)
//         .execute("PostFilestream");

//       res.status(200).json(messageFile.recordsets);

//     } catch (e) {
//       res.status(500).json({ Error: e.message });
//       console.log(e);
//     }

// };

const delete_message = async (req, res, next) => {
  console.log('dbops_messages.delete_message was reached')
  console.log('Clientid used: ' + req.params.clientid)
  console.log('Jobid used: ' + req.params.jobid)
}

module.exports = {
  get_messages,
  get_message,
  post_message,
  delete_message,
}
