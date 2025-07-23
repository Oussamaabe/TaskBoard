const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Task = require("../models/Task");

const userStats = asyncWrapper(async (req, res) => {
  const { userId } = req.params;
  const tasks = await Task.find({ userId });
  const tasksDone = tasks.filter((task) => task.isDone === true && task.userId === userId);
  const stats = {
    nbrTasks: tasks.length,
    nbrTasksDone: tasksDone.length,
  };
  res.status(200).json(stats);
});

module.exports = {
  userStats
};
