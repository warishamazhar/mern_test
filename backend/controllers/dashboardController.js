const Investment = require("../models/Investment");
const ROI = require("../models/ROI");
const ReferralIncome = require("../models/ReferralIncome");

exports.dashboard = async (req, res) => {
  try {
    const userId = req.user._id;

    const [investments, roiList, referralList] = await Promise.all([
      Investment.find({ userId }),
      ROI.find({ userId }),
      ReferralIncome.find({ userId }),
    ]);

    const totalInvestment = investments.reduce(
      (sum, inv) => sum + inv.amount,
      0
    );

    const totalROI = roiList.reduce((sum, r) => sum + r.roiAmount, 0);

    const levelIncome = referralList.reduce((sum, r) => sum + r.amount, 0);

    res.json({
      totalInvestment,
      totalROI,
      levelIncome,
      investments,
      roiHistory: roiList,
      referralIncome: referralList,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
