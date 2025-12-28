const User = require("../models/User");

const getTree = async (userId) => {
  const users = await User.find({ referredBy: userId }).select("name email");

  for (let u of users) {
    u._doc.children = await getTree(u._id);
  }
  return users;
};

exports.referralTree = async (req, res) => {
  try {
    const tree = await getTree(req.user._id);
    res.json(tree);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
