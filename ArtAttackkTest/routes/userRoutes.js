const express = require("express");
const { registerUser, login, getDetails, addBio } = require("../controllers/userController");
const { body } = require("express-validator");
const { addPost, updatePost, getUserPosts, deletePost } = require("../controllers/postController");
const router = express.Router();



// Validation middleware
const validateUser = [
  body("firstName").trim().notEmpty().withMessage("First name is required"),
  body("lastName").trim().notEmpty().withMessage("Last name is required"),
  body("email").isEmail().withMessage("Invalid email format"),
  body("phoneno").isMobilePhone().withMessage("Invalid phone number"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

// user api's
router.post("/registerUser", validateUser, registerUser);
router.post("/login", login);
router.get("/getDetails", getDetails);
router.put("/addBio",addBio);



// post api's
router.post(
    "/add",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("description").notEmpty().withMessage("Description is required"),
        body("thumbnail").notEmpty().withMessage("Thumbnail URL is required"),
        body("video").notEmpty().withMessage("Video URL is required"),
        body("createdBy").notEmpty().withMessage("CreatedBy is required"),
    ],
    addPost
);
router.put("/update/:id", updatePost);
router.get("/user/:userId", getUserPosts);
router.delete("/delete/:id", deletePost);


module.exports = router;
