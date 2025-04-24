const express = require("express");
const router = express.Router();

router.get("/today-summary", (req, res) => {
  const todayData = {
    date: new Date().toLocaleDateString(),
    electricity: "3 power outages reported",
    water: "2 water supply issues",
    infrastructure: "5 road-related issues",
    health: "1 clinic reported issues",
  };

  res.json(todayData);
});

module.exports = router;
