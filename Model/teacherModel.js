const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  password: {
    type: String,
    match: [
      /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
      "must minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
    ],
    required: true,
  },
  email: {
    type: String,
    match: [
      /^[\_]*[A-Za-z0-9]+([\._-][A-Za-z0-9]+)*[@][A-Za-z0-9]{3,50}([\.][a-z]{2,5})+$/,
      "Please fill a valid email address",
    ],
    required: true,
  },
  image: String,
});

mongoose.model("teachers", TeacherSchema);
