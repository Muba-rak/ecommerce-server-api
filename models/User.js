const mongoose = require("mongoose");
const { Schema } = mongoose;
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "The minimum name length is 3"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [7, "The minimum password length is 7"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  // console.log(this.modifiedPaths());
  //  console.log(this.isModified('name'));
  // if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.generateToken = async function () {
  return jwt.sign(
    { userId: this._id, role: this.role, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );
};

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isCorrect = await bcrypt.compare(candidatePassword, this.password);
  return isCorrect;
};

module.exports = mongoose.model("User", userSchema);
