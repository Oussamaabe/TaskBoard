const asyncWrapper = require("../middleware/async");
const Category = require("../models/Category");
const Task = require("../models/Task");
const { createCustomError } = require("../errors/custom-error");
const getAllCategs = asyncWrapper(async (req, res) => {
  const categs = await Category.find({});
  res.status(200).json({ categs });
});

const createCateg = asyncWrapper(async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json({ category });
});

const deleteCateg = asyncWrapper(async (req, res, next) => {
  const { nameCateg } = req.params;
  const { idUser } = req.params;

  const tasks = await Task.deleteMany({ nameCategory: nameCateg , userId : idUser  })

  const category = await Category.findOneAndDelete({ nameCategory: nameCateg , userId : idUser  });

  if (!category) {
    return next(createCustomError(`No Category with name : ${nameCateg}`, 404));
  }
  res.status(200).json({ category });
  res.status(200).json({ tasks });
});

const updateCateg = asyncWrapper(async (req, res) => {
  const { nameCateg } = req.params;
  const { idUser } = req.params;

  const tasks = await Task.updateMany({ nameCategory: nameCateg , userId : idUser } , {nameCategory: req.body.nameCategory} , {
    new: true,
    runValidators: true,
  })

  const category = await Category.findOneAndUpdate({ nameCategory: nameCateg , userId : idUser }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ category });
  res.status(200).json({ tasks });
});

module.exports = {
  getAllCategs,
  createCateg,
  updateCateg,
  deleteCateg,
};
