const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.replace("Bearer ", "");
    const decoded = JWT.verify(token, process.env.JWT_TOKEN);
    req.userdata = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message: "auth failed ",
      error,
    });
  }
};
