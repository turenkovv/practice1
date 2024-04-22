require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/UserModel');

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.set('strictQuery', true);
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log("MongoDB conected..."))
    .catch(err => console.log(err))

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.post("/register", async (req, res) => {
  try {
      const newUser = await User.create({login: req.body.login, password: req.body.password});
      return res.status(200).json({newUser});
  } catch (err) {
    console.error(err);
    return res.status(500);
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));