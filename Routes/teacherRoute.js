const express = require("express");
const teacherValidation = require("../core/validations/teacherValidation");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/teacherController");
const authorization = require("./../core/Authroization/authorization");

const teacherRoute = express.Router();
teacherRoute
  .route("/teachers")
  .get(authorization.checkAdmin, controller.getAllTeachers)
  .post(
    authorization.checkAdmin,
    teacherValidation.addTeacherValidation,
    checkValidations,
    controller.addTeacher
  )
  .patch(
    authorization.checkAdminAndTeacher,
    teacherValidation.updateTeacherValidation,
    checkValidations,
    controller.updateTeacher
  )
  .delete(
    authorization.checkAdmin,
    teacherValidation.deleteTeacherValidation,
    checkValidations,
    controller.deleteTeacher
  );

module.exports = teacherRoute;
