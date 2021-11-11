const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const ComprasController = require("../controllers/Compras");

router.post("/", validateToken, ComprasController.store);
router.get("/", validateToken, ComprasController.findAll);
router.delete("/delete/:id", validateToken, ComprasController.delete);

module.exports = router;
