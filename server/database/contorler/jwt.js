const jwt = require('jsonwebtoken')

const check = (req, res, next) => {
  const header = req.headers["authorization"];
  if (typeof header !== "undefined") {
    const bearer = header.split(" ");
    const token = bearer[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    } else {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          return res.status(403).json({ message: "Forbidden" });
        }
        req.user = user;
        next();
      });
    }
  }
};
module.exports = {check};
