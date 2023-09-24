const express = require("express");
const router = express.Router();
const {
  createMessage,
  getMessage,
  updateMessageView,
  getUnViewedMessage,
} = require("../controllers/message");

router.route("/").post(createMessage);
router.route("/:id").get(getMessage).patch(updateMessageView);
router.route("/unview/:id").post(getUnViewedMessage);

module.exports = router;
