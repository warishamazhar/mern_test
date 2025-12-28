const ReferralIncome = require("../models/ReferralIncome");
const User = require("../models/User");

const LEVEL_PERCENT = [5, 3, 2]; 

exports.distributeReferralIncome = async (userId, investmentAmount) => {
  let currentUser = await User.findById(userId);
  let level = 0;

  while (currentUser?.referredBy && level < LEVEL_PERCENT.length) {
    const parent = await User.findById(currentUser.referredBy);
    if (!parent) break;

    const income = (investmentAmount * LEVEL_PERCENT[level]) / 100;

    await ReferralIncome.create({
      userId: parent._id,
      fromUser: userId,
      level: level + 1,
      amount: income,
    });

    await User.findByIdAndUpdate(parent._id, {
      $inc: { balance: income },
    });

    currentUser = parent;
    level++;
  }
};
