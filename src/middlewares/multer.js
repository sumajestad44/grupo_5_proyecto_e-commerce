const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, `../../public/images/users/`))
  },
  filename: function (req, file, cb) {
    let FileName = file.originalname + '(' + Date.now() + ')' + path.extname(file.originalname)
    cb(null, FileName)
  },
})

const uploadFile = multer({ storage })

module.exports = uploadFile;