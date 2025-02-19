const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    post_id: {
        type: String,
        required: true,
        unique: true,
        default: () => new mongoose.Types.ObjectId().toString(), // Unique ID for the post
    },
    title: {
        type: String,
        required: true,
        trim: true, // Removes extra spaces
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    thumbnail: {
        type: String, // URL or file path
        required: true,
    },
    video: {
        type: String, // URL or file path
        required: true,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Reference to the User model
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
