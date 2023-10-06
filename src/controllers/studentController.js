const Student = require("../models/Student");
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;

  const hashedPassword = bcrypte.hashSync(password);
  const student = new Student({
    fullName,
    email,
    password: hashedPassword,
  });
  try {
    await student.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: student });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Student.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypte.compareSync(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "invalid Email / password" });
  }
  const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "3h",
  });
  res.cookie(String(existingUser._id), token, {
    path: "/",
    expires: new Date(Date.now() + 10800000),
    httpOnly: true,
    sameSite: "lax",
  });

  return res
    .status(200)
    .json({ message: "Successfully Logged In", student: existingUser });
};

exports.logout = async (req, res) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, student) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalide token" });
    }
    res.clearCookie(`${student.id}`);
    req.cookies[`${student.id}`] = "";
    return res.status(200).json({ message: "loged out" });
  });
};

exports.getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
