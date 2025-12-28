const express = require("express");
const { createInvestment } = require("../controllers/investmentController");
const auth = require("../middlewares/authMiddleware");

const investmentRouter = express.Router();

investmentRouter.post("/add", auth, createInvestment);

module.exports = investmentRouter;
