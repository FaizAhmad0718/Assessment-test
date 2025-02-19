const User = require("../model/User");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    let { firstName, lastName, email, phoneno, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ firstName }, { email }],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already exists with this email or firstName." });
    }

    password = await bcrypt.hash(password, 15);

    await User.create({
      firstName,
      lastName,
      username: firstName,
      email,
      phoneno,
      password,
    });

    return res.status(201).json({ message: "User created successfully." });
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const login = async (req, res) => {
  try {
    const { firstName, password } = req.body;
    const existingUser = await User.findOne({ firstName });

    if (!existingUser) {
      return res.status(404).json({ message: "User does not exist" });
    }

    const passwordComparison = await bcrypt.compare(password, existingUser.password);

    if (!passwordComparison) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jsonwebtoken.sign({ email: existingUser.email }, "*&$12345*", { expiresIn: "1d" });

    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};

const getDetails = async (req, res) => {
  try {
    let users = await User.find();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};


const verifyToken = async (req, res, next) => {
    try {
      const token = req.headers?.authorization;
      const verifytoken_ = jsonwebtoken?.verify(token, jwtSECRET);
      console.log(req.headers?.authorization, verifytoken_);
  
      if (req.headers?.authorization) {
        if (token && verifytoken_) {
          return next();
        } else {
          return res.status(404).json("Unauthorized token");
        }
      } else {
        return res.status(404).json(`No token found`);
      }
    } catch (error) {
      return res.status(500).json({ message: "Internal server error", error });
    }
  };


  const addBio = async (req, res) => {
    try {
        let token_ = req.query.token;
        const verifytoken_ = jsonwebtoken.verify(token_, "*&$12345*");
        if (!verifytoken_) {
            return res.status(400).json({ message: "Invalid token received" });
        }
        const { bio } = req.body; 

        if (!bio || bio.trim() === "") {
            return res.status(400).json({ message: "Bio cannot be empty" });
        }

        // Count words in bio
        const wordCount = bio.trim().split(/\s+/).length;
        if (wordCount > 300) {
            return res.status(400).json({ message: "Bio must not exceed 300 words." });
        }
        const updatedUser = await User.findOneAndUpdate(
            { user_id: verifytoken_.user_id },
            { bio: bio },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json({ message: "Bio updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error updating bio:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};



module.exports = { registerUser, login,addBio, getDetails};
