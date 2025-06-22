const express = require("express");
const router = express.Router();
const {
  getUsers,
  deleteUser,
} = require("../controllers/user.controller.js");
const { protectRoute, adminRoute } = require("../middleware/authorization.js");

router.get("/admin/users", protectRoute, adminRoute, adminRoute, getUsers);


router.delete("/admin/delete/:id", protectRoute, adminRoute, deleteUser);

module.exports = router;
