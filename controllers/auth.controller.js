const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

// Register new user
exports.register = async (req, res) => {
  const { username, password, email } = req.body;

  if (!username || !password || !email) {
    return res
      .status(400)
      .send({ message: "Username, password and email are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      email,
      password: hashedPassword,
    });
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(201).send({ message: "User registered", token });
  } catch (error) {
    res.status(500).send({ message: "Error registering user", error });
  }
};

// User login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).send({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.send({ message: "Login successful", token });
  } catch (error) {
    res.status(500).send({ message: "Error logging in", error });
  }
};
