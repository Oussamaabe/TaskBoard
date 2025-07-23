const express = require("express");
const route = express.Router();
const {createUser , getUsers} = require("../controllers/users");

route.route("/").get(getUsers).post(createUser);

module.exports = route;
