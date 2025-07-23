const express = require("express");
const route = express.Router();
const {
  createTask,
  getAllTasks,
  getTask,
  getTasksWithCateg,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

route.route("/").get(getAllTasks).post(createTask);
route.route("/:taskId").get(getTask).patch(updateTask).delete(deleteTask);
route.route("/category/:nameCategory").get(getTasksWithCateg);

module.exports = route;
