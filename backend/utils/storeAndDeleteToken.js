const jwt = require("jsonwebtoken");
const redis = require("../config/redis.js");
const storeRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `refresh_token:${userId}`,
    refreshToken,
    "EX",
    7 * 24 * 60 * 60
  );
};
const revokeRefreshToken = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`refresh_token:${decoded.userId}`);
    return { success: true };
  } catch (err) {
    console.warn("Token revocation failed:", err.message);
    return { success: false, error: err.message };
  }
};

module.exports = { storeRefreshToken, revokeRefreshToken };
