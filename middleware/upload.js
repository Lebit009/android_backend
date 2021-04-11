const multer = require("multer")

const storage = multer.diskStorage({
    destination : function(req,file,cb){ //cb = callback
        cb(null,'./Allimages')
    },
    filename : function(req,file,cb){
        cb(null,Date.now() +file.originalname)
    }
})

const upload = multer({
    storage : storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
          cb(null, true);
        } else {
          req.fileValidationError = 'Can store image types only !!';
          cb(null, false);
         
        }
      }
});

module.exports = upload;