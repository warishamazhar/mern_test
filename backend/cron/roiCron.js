const cron = require("node-cron");
const Investment = require("../models/Investment");
const ROI = require("../models/ROI");
const User = require("../models/User");

cron.schedule("0 0 * * *", async () => {
const today = new Date();
today.setHours(0, 0, 0, 0);

  const investments = await Investment.find({ status: "active" });

  for (let inv of investments) {
    const exists = await ROI.findOne({
      investmentId: inv._id,
      date: today,
    });
    if (exists) continue;

    const roi = (inv.amount * inv.roiPercent) / 100;

    await ROI.create({
      userId: inv.userId,
      investmentId: inv._id,
      date: today,
      roiAmount: roi,
    });

    await User.findByIdAndUpdate(inv.userId, {
      $inc: { balance: roi },
    });
  }
});
