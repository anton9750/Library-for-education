const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access Denied. Authorization Bearer Token payload missing." });
  }

  const token = authHeader.split(" ")[1];
  try {
    const verifiedPayload = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = verifiedPayload;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Access Denied. The token authentication key provided is structurally invalid or expired." });
  }
};