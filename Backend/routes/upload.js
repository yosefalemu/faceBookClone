const path = require("path");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    return cb(null, "../client/public/assets/images");
  },
  filename(req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  res.send(`${req.file.filename}`);
});

module.exports = router;
