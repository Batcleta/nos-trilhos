const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const CategoriaController = require("../controllers/Categorias");

router.post("/", validateToken, CategoriaController.store);
router.get("/", validateToken, CategoriaController.findAll);
router.get("/:uuid", validateToken, CategoriaController.findOne);
router.put("/:uuid", validateToken, CategoriaController.update);
router.delete("/delete/:uuid", validateToken, CategoriaController.delete);

module.exports = router;
