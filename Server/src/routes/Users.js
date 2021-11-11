const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const UserController = require("../controllers/Users");

router.post("/", UserController.store);
router.post("/login", UserController.login);
router.get("/", UserController.findAll);
// router.get("/", UserController.delete )
router.get("/auth", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
