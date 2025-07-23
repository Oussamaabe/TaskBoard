const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const Task = require("../models/Task");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task: task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }

  res.status(200).json({ task });
});

const getTasksWithCateg = asyncWrapper(async (req, res, next) => {
  const { nameCategory } = req.params;
  const task = await Task.find({ nameCategory });
  if (task.length < 1) {
    return next(
      createCustomError(`No task with category : ${nameCategory}`, 404)
    );
  }

  res.status(200).json({ task });
});

const updateTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!task) {
    return next(createCustomError(`No task with id : ${taskId}`, 404));
  }
  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res, next) => {
  const { taskId } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    next(createCustomError(`No task with id : ${taskId}`, 404));
    return res.status(404).json({
      success: false,
      msg: `No task with id : ${taskId}`,
    });
  }
  res.status(200).json({ task });
});

module.exports = {
  createTask,
  getAllTasks,
  getTask,
  getTasksWithCateg,
  updateTask,
  deleteTask,
};
