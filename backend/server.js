const express = require("express");

const cors = require("cors");

require("dotenv").config();

const connectDb = require("./config/db");
require("./cron/roiCron");

const authRoute = require("./routes/authRoutes");
const investmentRoute = require("./routes/investmentRoutes");
const dashboardRoute = require("./routes/dashboardRoutes");
const referralTreeRoute = require("./routes/referralTreeRoutes")
const app = express();
app.use(express.json());
app.use(cors())
connectDb();

app.use("/api/auth", authRoute);
app.use("/api/investments", investmentRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/referrals", referralTreeRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
