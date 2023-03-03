const { body } = require("express-validator");
module.exports.addTeacherValidation = [
  body("fullName").isAlpha().withMessage("Name should be string"),
  body("password")
    .isStrongPassword()
    .withMessage("Teacher Password should be strong"),
  body("email").isEmail().withMessage("Email should be i email formate "),
  body("image")
    .optional()
    .isString()
    .withMessage("Image path should be string"),
];

module.exports.updateTeacherValidation = [
  body("_id").isMongoId().withMessage("Teacher Id  should be object id"),
  body("fullName").optional().isAlpha().withMessage("Name should be string"),
  body("password")
    .optional()
    .isString()
    .withMessage("Teacher Password should be string"),
  body("email")
    .optional()
    .isEmail()
    .withMessage("Email should be i email formate "),
  body("image").optional().isString().withMessage("Image should be string"),
];

module.exports.deleteTeacherValidation = [
  body("_id").isMongoId().withMessage("Teacher Id  should be object id"),
];
