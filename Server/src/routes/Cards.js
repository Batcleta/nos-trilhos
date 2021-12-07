const express = require("express");
const router = express.Router();
const { validateToken } = require("../middlewares/AuthMiddleware");

// Controllers
const CardController = require("../controllers/Cards");

router.post("/", validateToken, CardController.store);
router.get("/", validateToken, CardController.findAll);
router.get("/:uuid", validateToken, CardController.findOne);
router.put("/:uuid", validateToken, CardController.update);
router.delete("/delete/:uuid", validateToken, CardController.delete);

module.exports = router;
