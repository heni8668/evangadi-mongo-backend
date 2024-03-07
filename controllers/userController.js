const users = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//register user controller
const addUser = async (req, res) => {
  try {
    const { username, firstname, lastname, email, password } = req.body;

    if (!username || !firstname || !lastname || !email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    //check if the user is alreay exist
    const user = await users.findOne({ $or: [{ username }, { email }] });

    if (user) {
      return res.status(400).json({ message: "User already exist" });
    }

    //check the password length
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters" });
    }

    //hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create new user
    const newUser = new users({
      username,
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User is not registered" });
  }
};

//login user controller

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all fields" });
    }

    //find the user by email
    const user = await users.findOne({ email });
    // console.log(user);
    if (!user) {
      return res.status(401).json({ message: "User is not registered" });
    }

    //check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password is incorrect" });
    }

    //generate token
    const token = jwt.sign(
      { _id: user._id, username: user.username },

      process.env.JWT_SECRET,
      {
        expiresIn: 3600,
      }
    );
    res.status(200).json({
      msg: "User logged in successfully",
      token,
      _id: user._id,
      username: user.username,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "User is not logged in" });
  }
};

// check user
const check = async (req, res) => {
  const { username, _id } = req.user;

  //   console.log(req.user);

  res.status(200).json({ msg: "The user is authenticated", _id, username });
};

module.exports = { addUser, loginUser, check };
