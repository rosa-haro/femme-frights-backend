const multer = require("multer");
const path = require("path");

// Configure where and how uploaded files will be stored
const storage = multer.diskStorage({
    // Destination folder
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    // Name format
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// Filter to only allow images
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false);
    }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;

