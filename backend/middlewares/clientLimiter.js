const rateLimit = require("express-rate-limit");
const crypto = require("crypto");

const createCompositeKey = (req) => {
  // Start with client ID from cookie
  let key = req.clientId || "unknown";
  console.log("key: " + key);

  // Add basic browser fingerprinting (optional)
  const userAgent = req.get("user-agent") || "unknown";
  console.log("userAgent: " + userAgent);

  // Create a hash of the combined identifiers
  return crypto.createHash("md5").update(`${key}-${userAgent}`).digest("hex");
};

const clientLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 30, // Stricter per-client limit
  standardHeaders: true,
  keyGenerator: createCompositeKey, // Use our composite identifier
  message: "Too many login attempts, please try again later",
});

module.exports = clientLimiter;
