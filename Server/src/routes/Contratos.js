const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const ContratosController = require("../controllers/Contratos");

router.post("/", validateToken, ContratosController.store);
router.get("/", validateToken, ContratosController.findAll);
router.get("/:uuid", validateToken, ContratosController.findOne);
router.put("/update/:uuid", validateToken, ContratosController.update);
router.delete("/delete/:uuid", validateToken, ContratosController.delete);

router.put("/contas", validateToken, ContratosController.updateConta);
module.exports = router;
