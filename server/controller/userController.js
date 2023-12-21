import jwt from "jsonwebtoken";
import User from "../model/usersSchema.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(409).send("Email already exists");
    }

    const rounds = 12;
    const hashedPassword = await bcrypt.hash(password, rounds);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).send("User Created");
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

export const login = async (req, res) => {
  try {

    const { email, password } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user || !(bcrypt.compare(password, user.password))) {
      return res.status(401).send("Wrong user");
    }
    const token = jwt.sign(
      {
        userId: user._id,
      },
      "secretKey",
      { expiresIn: "60s" }
    );
    res.send(token);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};


export const getAllUser = async (req,res)=>{
    try {
        res.send("welcomeUser")
    } catch (error) {
        console.log(error);
    }
} 