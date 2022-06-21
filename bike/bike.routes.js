const express = require("express");
const router = express.Router();

const BikeController = require("./bike.controller");

router.get("", BikeController.getBikes);
router.get("/:id", BikeController.getBikesByID);
router.post("", BikeController.createBikes);
router.patch("/:id/toggleIsActive", BikeController.toggleBikeActive);
router.delete("/:id", BikeController.deleteBikes);

module.exports = router;
