const mongoose = require("mongoose");
require("./../Model/teacherModel");
const TeacherSchema = mongoose.model("teachers");

module.exports.getAllTeachers = (request, response, next) => {
  TeacherSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addTeacher = (request, response, next) => {
  let teacherObject = new TeacherSchema({
    fullName: request.body.fullName,
    password: request.body.password,
    email: request.body.email,
    image: request.body.image,
  });

  teacherObject
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateTeacher = (request, response, next) => {
  if (request.id == request.body._id || request.role == "admin") {
    TeacherSchema.updateOne(
      { _id: request.body._id },
      {
        $set: {
          fullName: request.body.fullName,
          password: request.body.password,
          email: request.body.email,
          image: request.body.image,
        },
      }
    )
      .then((data) => {
        response.status(200).json({ data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    let error = new Error("Not Authorized");
    error.status = 403;
    next(error);
  }
};

module.exports.deleteTeacher = (request, response, next) => {
  TeacherSchema.deleteOne({ _id: request.body._id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
