const express = require("express");
const {
  getSeoSettings,
  updateSeoSettings,
} = require("../controllers/SeoSettingsController");
const authenticate = require("../middlewares/auth");
const router = express.Router();

router.get("/", getSeoSettings);

router.put("/update", authenticate, updateSeoSettings);

module.exports = router;
