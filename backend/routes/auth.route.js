const express = require("express");
const { body } = require("express-validator");
const {
  login,
  logout,
  signup,
  refreshToken,
  getProfile,
  forgotPassword,
  resetPassword,
} = require("../controllers/auth.controller.js");
const upload = require("../middleware/upload.js");
const { protectRoute } = require("../middleware/authorization.js");
// const { protectRoute } =require("../middleware/Authorization.js");

const router = express.Router();

router.post(
  "/signup",
  upload.single("profilePic"),
  [
    body("firstName")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters"),
    body("lastName")
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters"),
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  signup
);
router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Please provide a valid email"),
    body("password").notEmpty().withMessage("Password is required"),
  ],

  login
);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

module.exports = router;
