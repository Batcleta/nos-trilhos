const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const CategoriaController = require("../controllers/Categorias");

router.post("/", validateToken, CategoriaController.store);
router.get("/", validateToken, CategoriaController.findAll);
router.delete("/delete/:id", validateToken, CategoriaController.delete);

module.exports = router;
