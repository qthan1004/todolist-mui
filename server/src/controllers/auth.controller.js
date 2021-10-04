const jwt = require("jsonwebtoken");

const User = require("../models/User.model");

//@route GET api/auth
//@desc check if user is logged in
//@access Public
module.exports.isLogin = async (req, res) => {
  try {
    const user = await User.findById(req.userID).select("-password");

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//@route POST api/auth/register
//@desc Register user
//@access Public
module.exports.createUser = async (req, res) => {
  const { username, password } = req.body;

  //simple validate
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  }

  try {
    //check for existing user
    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already taken",
      });
    }

    //ALL PASS
    const newUser = new User({
      username,
      password,
    });
    await newUser.save(); // TẠO USER MỚI

    // RETURN TOKEN
    const accessToken = jwt.sign(
      { userID: newUser._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User created successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//@route POST api/auth/login
//@desc Login user
//@access Public
module.exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing username or password",
    });
  }

  try {
    //CHECK FOR EXISTING USER
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    if (password !== user.password) {
      return res.status(400).json({
        success: false,
        message: "Incorrect username or password",
      });
    }

    //ALL PASS -> RETURN TOKEN
    const accessToken = jwt.sign(
      { userID: user._id },
      process.env.ACCESS_TOKEN_SECRET
    );

    res.json({
      success: true,
      message: "User logged in successfully",
      accessToken,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
