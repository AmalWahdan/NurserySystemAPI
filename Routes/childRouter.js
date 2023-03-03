const express = require("express");
const childValidation = require("../core/validations/childValidations");
const checkValidations = require("../core/validations/checkValidations");
const controller = require("./../Controller/childController");
const authorization = require("./../core/Authroization/authorization");

const childRoute = express.Router();
childRoute
  .route("/child")
  .all(authorization.checkAdmin)
  .get(controller.getAllChildren)
  .post(
    childValidation.addChildValidation,
    checkValidations,
    controller.addChild
  )
  .patch(
    childValidation.updateChildValidation,
    checkValidations,
    controller.updateChild
  )
  .delete(
    childValidation.deleteChildValidation,
    checkValidations,
    controller.deleteChild
  );

childRoute.get(
  "/child/:id",
  authorization.checkAdmin,
  childValidation.getChildById,
  checkValidations,
  controller.getChildrenById
);

module.exports = childRoute;
