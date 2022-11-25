const bcrypt = require('bcrypt')

const crypto = require('crypto')

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY
const IV_LENGTH = 16 // For AES

export class JsonResponse {
  constructor(statusCode = 200) {
    this.statusCode = statusCode
  }
  error = (res, message, data) => {
    return res.status(this.statusCode).json({
      status: false,
      message,
      data,
    })
  }
  success = (res, message, data) => {
    return res.status(this.statusCode).json({
      status: true,
      message,
      data,
    })
  }
}

export const randomString = (length) => {
  let numbers = '0123456789'
  let chars = 'acdefhiklmnoqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY'

  let randomstring = ''
  let randomstring2 = ''

  for (let x = 0; x < Math.floor(length / 2); x++) {
    let rnum = Math.floor(Math.random() * chars.length)
    randomstring += chars.substring(rnum, rnum + 1)
  }
  for (let y = 0; y < Math.floor(length / 2); y++) {
    let rnum2 = Math.floor(Math.random() * numbers.length)
    randomstring2 += numbers.substring(rnum2, rnum2 + 1)
  }
  let finalString = (randomstring + randomstring2).split('')
  return shuffle(finalString).join('')
}

// compare hash
export const compareHash = (string, hash) => bcrypt.compare(string, hash)

export const hashString = async function (string) {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(string, salt)
}

export const encryptData = (data) => {
  let iv = crypto.randomBytes(IV_LENGTH)
  let cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let encrypted = cipher.update(data)

  encrypted = Buffer.concat([encrypted, cipher.final()])

  return iv.toString('hex') + ':' + encrypted.toString('hex')
}

export const decryptData = (data) => {
  let textParts = data.split(':')
  let iv = Buffer.from(textParts.shift(), 'hex')
  let encryptedText = Buffer.from(textParts.join(':'), 'hex')
  let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv)
  let decrypted = decipher.update(encryptedText)

  decrypted = Buffer.concat([decrypted, decipher.final()])

  return decrypted.toString()
}
