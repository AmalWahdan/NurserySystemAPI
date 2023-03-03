const { body, param } = require("express-validator");
module.exports.addClassValidation = [
  body("name").isAlpha().withMessage("Name should be string"),
  body("supervisor").isMongoId().withMessage("Teacher Id  should be object id"),
  body("children")
    .optional()
    .isArray()
    .withMessage("children  ids must be array"),
  body("children[*]")
    .optional()
    .isInt()
    .withMessage("Children Ids should be numbers"),
];

module.exports.updateClassValidation = [
  body("id").isInt().withMessage("Class Id should be number"),
  body("name").optional().isAlpha().withMessage("Name should be string"),
  body("supervisor")
    .optional()
    .isMongoId()
    .withMessage("Teacher Id  should be object id"),
  body("children")
    .optional()
    .isArray()
    .withMessage("  children  ids must be array"),
  body("children[*]")
    .optional()
    .isInt()
    .withMessage("Children Ids should be numbers"),
];

module.exports.deleteClassValidation = [
  body("id").isInt().withMessage("Class Id should be number"),
];

module.exports.getClassChildernValidation = [
  param("id").isInt().withMessage("Class Id should be number"),
];

module.exports.getClassSupervisorValidation = [
  param("id").isInt().withMessage("Class Id should be number"),
];

module.exports.getClassById = [
  param("id").isInt().withMessage("Class Id should be number"),
];
