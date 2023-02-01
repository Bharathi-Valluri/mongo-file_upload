const multer = require('multer')
// const file_controller = require('../controller/mongoController')
const fs = require('fs')
const path = require('path')
const storage = multer.diskStorage({
  destination: 's3-file-upload/',
  filename: function (_req, file, cb) {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    )
  }
})

var upload = multer({
  storage: storage,
  limits: {
    fields: 5,
    fieldNameSize: 50, // TODO: Check if this size is enough
    fieldSize: 200000, //TODO: Check if this size is enough
    // TODO: Change this line after compression
    fileSize: 12000000 // 120 KB for a 1080x1080 JPG 90
  },
  fileFilter: function (_req, file, cb) {
    checkFileType(file, cb)
  }
})
function checkFileType (file, cb) {
  // Allowed ext

  const filetypes = /jpeg|jpg|png|tiff|gif/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)
  if (mimetype && extname) {
    return cb(null, true)
  } else {
    cb('Error: Images Only!')
  }
}
module.exports = { upload }
