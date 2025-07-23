const asyncWrapper = require("../middleware/async");
const User = require("../models/User");
const bcrypt = require('bcrypt');

const createUser = asyncWrapper(async (req, res) => {

  const {userId , fullName, email } = req.body;
  
  const user = await User.create({userId , fullName , email });
  
  res.status(201).json({ user });

});

const getUsers = asyncWrapper(async (req, res) => {
  const users = await User.find({});
  res.status(200).json({ users });
});

  

module.exports ={
  createUser,
  getUsers
} 
