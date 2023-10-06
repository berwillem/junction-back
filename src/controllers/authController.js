const Teacher = require("../models/Teacher");
const bcrypte = require("bcryptjs");
const jwt = require("jsonwebtoken");

// signup teacher :

exports.signup = async (req, res) => {
  const { fullName, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Teacher.findOne({ email: email });
  } catch (err) {
    console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "Teacher already exsist ! Login instead " });
  }
  const hashedPassword = bcrypte.hashSync(password);
  const teacher = new Teacher({
    fullName,
    email,
    password: hashedPassword,
  });

  try {
    await teacher.save();
  } catch (err) {
    console.log(err);
  }
  return res.status(201).json({ message: teacher });
};

// login teacher:
exports.login = async (req, res) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await Teacher.findOne({ email: email });
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
    .json({ message: "Successfully Logged In", teacher: existingUser });
};

// logout :

exports.logout = async (req, res) => {
  const cookies = req.headers.cookie;
  const token = cookies.split("=")[1];
  if (!token) {
    return res.status(404).json({ message: "token not found" });
  }
  jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, teacher) => {
    if (err) {
      console.log(err);
      return res.status(401).json({ message: "Invalide token" });
    }
    res.clearCookie(`${teacher.id}`);
    req.cookies[`${teacher.id}`] = "";
    return res.status(200).json({ message: "loged out" });
  });
};
