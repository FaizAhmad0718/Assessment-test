const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");

const app = express();
const port = 3000;

mongoose
  .connect("mongodb://localhost:27017/ArtAttackk")
  .then(() => console.log("Mongoose connected"))
  .catch((err) => console.log(err));

app.use(express.json());

// Use Routes
app.use("/api/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
