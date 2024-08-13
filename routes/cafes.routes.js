const express = require("express");
const cafeController = require("../controllers/cafeControllers.js");

const router = express.Router();

router.get("/", cafeController.cafes);
router.post("/", cafeController.createCafe);
router.delete("/:id", cafeController.deleteCafeById);
router.put("/:id", cafeController.updateCafeById);

module.exports = router;
