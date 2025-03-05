const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await User.find({});

    res.json(users);
  } catch (err) {
    next(err);
  }
});

usersRouter.post("/", async (req, res, next) => {
  const { username, name, password } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      name,
      passwordHash,
    });

    const savedUser = await user.save();

    res.status(201).json(savedUser);
  } catch (err) {
    next(err);
  }
});

module.exports = usersRouter;
