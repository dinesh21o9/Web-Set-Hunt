const { v4: uuidv4 } = require('uuid');

const clientIdentifier = (req, res, next) => {
  // Check for existing client ID in cookie
  if (!req.cookies.clientId) {
    // Create a new UUID for this client
    const clientId = uuidv4();
    // Set cookie with reasonable expiration (7 days)
    res.cookie("clientId", clientId, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
      sameSite: "strict",
    });
    req.clientId = clientId;
  } else {
    req.clientId = req.cookies.clientId;
  }
  next();
};

module.exports = clientIdentifier;
