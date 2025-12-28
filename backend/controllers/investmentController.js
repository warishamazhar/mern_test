const Investment = require("../models/Investment");
const { distributeReferralIncome } = require("../utils/referralLogic");

exports.createInvestment = async (req, res) => {
  try {
    const investment = await Investment.create({
      ...req.body,
      userId: req.user._id,
    });

    await distributeReferralIncome(req.user._id, investment.amount);

    res.status(201).json({
      message: "Investment created successfully",
      investment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
