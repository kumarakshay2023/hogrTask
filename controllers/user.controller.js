const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const brcypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { asyncHandler } = require("../utils/asyncHandler");
const { Reward } = require("../models");

function calculateReward(streak) {
  return 10 + (streak - 1) * 10;
}

exports.registerUser = asyncHandler(async (req, res) => {
  const { username, password, name } = req.body;
  console.log(req.body);
  if (!username) throw new ApiError("Username must be provided", 400);
  if (!password) throw new ApiError("Password must be provided", 400);
  if (!name) throw new ApiError("Name must be provided", 400);
  console.log("dsadas", User);
  const existedUser = await User.findOne({
    where: {
      username: username,
    },
  });
  const hashPassword = await brcypt.hash(password, 10);
  if (existedUser) throw new ApiError("User already exists", 400);
  const user = await User.create({
    username: username,
    name: name,
    password: hashPassword,
    last_login: Date.now(),
  });

  const token = jwt.sign(
    {
      id: user.id,
      username: username,
    },
    process.env.JWT_SECRET
  );
  if (!token) throw new ApiError("something went wrong", 400);
  return res.status(200).json({
    data: user,
    success: true,
    message: "User registered successfully",
    token: token,
  });
});

exports.login = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username) throw new ApiError("username is required", 400);
  if (!password) throw new ApiError("Password must be provided", 400);
  const user = await User.findOne({
    where: {
      username: username,
    },
  });
  let coins = 0;
  let streak = 0;

  if (user.last_login) {
    const last_loginDate = new Date(user.last_login);
    const currentDate = new Date();
    const timeDifference = currentDate - last_loginDate;
    const oneDay = 24 * 60 * 60 * 1000;

    if (timeDifference <= oneDay) {
      streak = user.streak + 1;
      coins = calculateReward(streak);
    } else {
      streak = 1;
      coins = 10;
    }
  } else {
    streak = 1;
    coins = 10;
  }
  const checkPassword = await brcypt.compare(password, user.password);
  if (!checkPassword)
    throw new ApiError("username or password is incorrect", 400);
  await user.update({
    last_login: new Date(),
    coins: user.coins + coins,
    streak,
  });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

  return res.status(200).json({ token, user });
});
