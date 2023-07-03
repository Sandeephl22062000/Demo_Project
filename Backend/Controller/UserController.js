const User = require("../Model/UserModel");
// const sendEmail = require("../utils/email");
const jwt = require("jsonwebtoken");
const catchAync = require("../utils/catchAync");
const AppError = require("../Error-Handling/error");
const bcrypt = require("bcrypt");
const axios = require("axios");
require("dotenv").config();

const registerUser = catchAync(async (req, res, next) => {
  if (req.body.googleAccessToken) {
    accessToken = req.body.googleAccessToken;
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("response", response);
    const name = response.data.name;
    const email = response.data.email;
    const photo = response.data.picture;
    console.log("name", name, photo, email);

    const userFind = await User.findOne({ email });

    if (userFind) return next(new AppError("This Email is Already registered"));

    const user = await User.create({
      name,
      email,
      photo,
    });
    console.log("users", user);
    if (user) {
      res.json({
        message: "Successfully register",
        data: user,
      });
    } else {
      return next(new AppError("Something went wrong", 500));
    }
  } else {
    const { email, password, name, specialization, experiences, role } =
      req.body;
    console.log(req.body);
    if (!email || !password || !name) {
      return next(new AppError("Provide All the Requied Details", 401));
    }

    if (name.split(" ").length > 3) {
      return next(new AppError("Please Avoid Spaces", 401));
    }
    if (password.includes(" ") || email.includes(" "))
      return next(new AppError("Please Avoid Spaces", 401));

    const userFind = await User.findOne({ email });
    if (userFind) return next(new AppError("This Email is Already registered"));

    const HashedPassword = await bcrypt.hash(password, 12);
    console.log(HashedPassword);
    const user = await User.create({
      name,
      email,
      password: HashedPassword,
      photo: req.body.photo,
      role,
      specialization,
      experiences,
    });

    if (user) {
      res.json({
        message: "Successfully register",
        data: user,
      });
    } else {
      return next(new AppError("Something went wrong", 500));
    }
  }
});

const getAllUser = async (req, res) => {
  const users = await User.find().populate("posts");
  if (!users) return next(new AppError("No User to Display", 404));
  if (users) {
    res.json({
      message: "Successfully register",
      data: users,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const searchusersWithKeyword = async (req, res) => {
  const keyword = req.params.search
    ? {
        $or: [
          { name: { $regex: req.params.search, $options: "i" } },
          { email: { $regex: req.params.search, $options: "i" } },
        ],
      }
    : {};
  const users = await User.find(keyword);
  console.log(users);
  const usersExists = users.filter((user) => user.role === 0);
  console.log(usersExists);
  if (usersExists) {
    res.json({
      message: "Success",
      data: usersExists,
    });
  } else {
    return next(new AppError("Something went wrong", 500));
  }
};

const updateuserDetail = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log("id", id);
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    console.log(user);
    if (user) {
      res.status(200).json({
        message: "Details Updated",
        user,
      });
    }
  } catch (error) {
    return next(new AppError(error));
  }
};
const getUserById = async (req, res, next) => {
  const user = await User.findById(req.params.id).populate("posts");
  console.log(user);
  res.status(201).json({
    message: "Succes",
    data: user,
  });
};
const loginUser = async (req, res, next) => {
  if (req.body.googleAccessToken) {
    accessToken = req.body.googleAccessToken;
    const response = await axios.get(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log(response);
    const email = response.data.email;
    const UserInfo = await User.findOne({ email });
    if (!UserInfo) return next(new AppError("Please Register First", 401));

    const token = jwt.sign({ id: UserInfo._id }, process.env.SECRET_KEY);
    if (UserInfo) {
      res.json({
        message: "Successfully login",
        data: UserInfo._id,
        token,
      });
    } else {
      return next(new AppError("Something went wrong", 500));
    }
  } else {
    try {
      let email = req.body.email;
      let password = req.body.password;
      if (!email || !password) {
        return next(new AppError("Provide email and password both", 401));
      }
      const UserInfo = await User.findOne({ email });
      if (!UserInfo) return next(new AppError("Please Register First", 401));

      const PasswordChecking = await bcrypt.compare(
        password,
        UserInfo.password
      );
      if (!PasswordChecking)
        return next(new AppError("Please provide Correct Password", 401));

      const token = jwt.sign({ id: UserInfo._id }, process.env.SECRET_KEY);
      console.log(token);
      if (UserInfo) {
        res.json({
          message: "Successfully login",
          data: UserInfo._id,
          token,
        });
      } else {
        return next(new AppError("Something went wrong", 500));
      }
    } catch (error) {
      console.log(error);
    }
  }
};

const updatePassword = async (req, res) => {
  const user = await User.findById(req.params.id).select("+password");
  if (req.body.password === user.password) {
    user.password = req.body.NewPassword;
    console.log(user);
    await user.save({ validateBeforeSave: false });
    res.status(200).json({
      status: "Success",
      mssage: "Password changed sunccesfully",
    });
  } else {
    res.status(404).json({
      status: "Success",
      mssage: "Password invalid",
    });
  }
};

module.exports = {
  registerUser,
  getAllUser,
  loginUser,
  updatePassword,
  getUserById,
  updateuserDetail,
  searchusersWithKeyword,
};

/*  
justn to check
fvaerv
vaerd
ervedr*/
