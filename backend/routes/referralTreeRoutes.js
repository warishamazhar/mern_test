const express = require("express");
const { referralTree } = require("../controllers/referralController");
const auth = require("../middlewares/authMiddleware");

const referralRouter = express.Router();

referralRouter.get("/tree", auth, referralTree);

module.exports = referralRouter;
