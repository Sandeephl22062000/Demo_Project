const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
// const sendEmail = require("../utils/email");
const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide the username"],
      // unique: true,
    },
    email: {
      type: String,
      required: [true, "Please provide Email Address"],
      lowercase: true,
      validate: [validator.isEmail, "Please Provide Valid Email"],
    },
    password: {
      type: String,
      trim: true,
      minlength: 8,
      // maxlength: 30,
      validate: [
        validator.isStrongPassword,
        "Password Must Contain Atleast one upperCase alphabet,Atleast One LowerCase Alphabet,and Atleast 1 Special Character",
      ],
    },
    photo: {
      type: String,
    },
    role: { type: Number, default: 0 },
    posts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    isApproved: {
      type: Boolean,
      default: false,
    },
    specialization: {
      type: String,
    },
    experiences: {
      type: String,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

// UserSchema.pre("save", async function (next) {
//   await sendEmail({
//     email: this.email,
//     subject: "Registered",
//     message: `Your Email ID is ${this.email} and your Login Password is ${this.password}`,
//   });
//   next();
// });

// UserSchema.pre("save", async function (next) {
//   this.password = await bcrypt.hash(this.password, 12);
//   console.log(this.password);
//   next();
// });

module.exports = mongoose.model("User", UserSchema);
