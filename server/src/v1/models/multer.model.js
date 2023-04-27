const multer = require('multer');
const path = require('path')
const fs = require('fs')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {

        // cb(null, '../uploads/');
        const path1 = `./uploads1/`
        fs.mkdirSync(path1, { recursive: true })
        return cb(null, path1)

    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
})

const upload = multer({ storage: storage });

module.exports = upload;