const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
//objeto de usario
const tokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    JWT_SECRET,
    {
      expiresIn: "6h",
    }
  );
  return sign;
};
//firma de token repaso jwt
const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, JWT_SECRET);
  } catch (e) {
    return null;
  }
};
module.exports = { tokenSign, verifyToken };
