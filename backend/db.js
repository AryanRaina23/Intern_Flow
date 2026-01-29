const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/internship_db")
.then(() => {
  console.log("MongoDB Connected to internship_db");
})
.catch((err) => {
  console.log("Connection Error: ", err);
});