const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  // Get the token from header
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json({ error: "Authorization denied" });
  }
  try {
    const decode = jwt.verify(token, config.get("jwtsecret"));
    req.seller = decode.seller;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Authorization denied" });
  }
};
