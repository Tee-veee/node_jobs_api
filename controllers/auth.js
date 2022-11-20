const userModel = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors");

const register = async (req, res) => {
  const newUser = await userModel.create({ ...req.body });

  const { name } = newUser;

  const token = newUser.createJWT();

  res.status(StatusCodes.CREATED).json({
    user: {
      name,
    },
    token,
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const checkUser = await userModel.findOne({ email });

  if (!checkUser) {
    throw new UnauthenticatedError("Invalid login credentials");
  }

  const isPasswordCorrect = await checkUser.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid login credentials");
  }

  const token = checkUser.createJWT();

  res.status(StatusCodes.OK).json({ user: { name: checkUser.name }, token });
};

module.exports = {
  register,
  login,
};

// INTERNAL CONTROLLER ERROR HANLDING
// const { name, email, password } = req.body;

// if (!name || !email || !password) {
//   throw new BadRequestError("Please provide name, email and password");
// }
