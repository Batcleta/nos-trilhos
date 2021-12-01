const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const CategoriaController = require("../controllers/Categorias");

router.post("/", CategoriaController.store);
router.get("/", validateToken, CategoriaController.findAll);
router.get("/:uuid", CategoriaController.findOne);
router.put("/:uuid", CategoriaController.update);
router.delete("/delete/:uuid", CategoriaController.delete);

module.exports = router;
