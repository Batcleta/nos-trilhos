const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const RendaVariavelController = require("../controllers/RendaVariavel");

router.post("/", validateToken, RendaVariavelController.store);
// router.post("/rendaensal", validateToken, RendaVariavelController.storeRendaMensal);
router.get("/", validateToken, RendaVariavelController.findAll);
router.delete("/delete/:id", validateToken, RendaVariavelController.delete);

module.exports = router;
