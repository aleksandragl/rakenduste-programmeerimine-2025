const jwt = require("jsonwebtoken");

const JWT_SECRET = "my_super_secret_key";

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Username and password required" });
  }

  const payload = {
    username,
    role: "admin",
  };

  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};

exports.ping = (req, res) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader)
    return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Invalid token format" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "JWT valid", user: decoded });
  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
