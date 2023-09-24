const express = require("express");
const router = express.Router();
const {
  createRequest,
  deleteRequest,
  getRequest,
} = require("../controllers/friendRequest");

router.route("/").post(createRequest);
router.route("/:id").get(getRequest).delete(deleteRequest);
module.exports = router;
