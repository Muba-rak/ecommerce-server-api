require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const cookieparser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

//middleware
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("E-commerce API");
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();

app.use((req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});
