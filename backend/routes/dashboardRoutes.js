const express = require("express");
const { dashboard } = require("../controllers/dashboardController");
const auth = require("../middlewares/authMiddleware");

const dashboardRouter = express.Router();

dashboardRouter.get("/", auth, dashboard);

module.exports = dashboardRouter;
