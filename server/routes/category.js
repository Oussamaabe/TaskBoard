const express = require("express");
const route = express.Router();
const {
  getAllCategs,
  createCateg,
  updateCateg,
  deleteCateg,
} = require("../controllers/category");

route.route("/").get(getAllCategs).post(createCateg);
route.route("/:nameCateg/:idUser").delete(deleteCateg).put(updateCateg);

module.exports = route;
