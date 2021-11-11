const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const RendaFixaController = require("../controllers/RendaFixa");

router.post("/", validateToken, RendaFixaController.store);
// router.post("/rendaensal", validateToken, RendaFixaController.storeRendaMensal);
router.get("/", validateToken, RendaFixaController.findAll);
router.delete("/delete/:id", validateToken, RendaFixaController.delete);

module.exports = router;
