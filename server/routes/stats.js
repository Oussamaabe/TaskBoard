const express = require("express");
const route = express.Router();
const { userStats } = require("../controllers/stats");

route.route("/:userId").get(userStats);

module.exports = route;
