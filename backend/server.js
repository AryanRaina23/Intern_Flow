const express = require("express");
const cors = require("cors");
require("./db");
const User = require("./User");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
  const { name, email, password, college, domain } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password, college, domain });
    await newUser.save();
    res.json({ message: "Registration successful! Wait for admin approval." });
  } catch (err) {
    res.status(500).json({ message: "Error during registration" });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });

  if (!user) return res.json({ success: false, message: "Invalid credentials" });

  if (user.status === "Pending") {
    return res.json({ success: false, message: "Admin approval required to access dashboard" });
  }

  res.json({ success: true, user }); 
});


app.get("/students", async (req, res) => {
  const students = await User.find({});
  res.json(students);
});


app.put("/approve/:id", async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { status: "Approved" });
    res.json({ message: "Student approved successfully" });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));