const express = require("express");
const router = express.Router();
const {
  createConversation,
  getConversation,
  updateConversation,
} = require("../controllers/conversation");

router.route("/").post(createConversation);
router.route("/:id").get(getConversation).patch(updateConversation);

module.exports = router;
