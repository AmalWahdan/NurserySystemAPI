const express = require("express");
const classValidations = require("../core/validations/classValidations");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/classController");
const authorization = require("./../core/Authroization/authorization");

const classRoute = express.Router();
classRoute
  .route("/class")
  .all(authorization.checkAdmin)
  .get(controller.getAllClasses)
  .post(
    classValidations.addClassValidation,
    checkValidations,
    controller.addClass
  )
  .patch(
    classValidations.updateClassValidation,
    checkValidations,
    controller.updateClass
  )
  .delete(
    classValidations.deleteClassValidation,
    checkValidations,
    controller.deleteClass
  );

classRoute.get(
  "/class/:id",
  authorization.checkAdminAndTeacher,
  classValidations.getClassById,
  checkValidations,
  controller.getClassById
);

classRoute.get(
  "/classChildern/:id",
  authorization.checkAdminAndTeacher,
  classValidations.getClassChildernValidation,
  checkValidations,
  controller.getClassChildern
);

classRoute.get(
  "/classTeacher/:id",
  authorization.checkAdmin,
  classValidations.getClassSupervisorValidation,
  checkValidations,
  controller.getClassSupervisor
);

module.exports = classRoute;
