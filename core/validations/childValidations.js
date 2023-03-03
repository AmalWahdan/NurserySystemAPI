const { body, param } = require("express-validator");
module.exports.addChildValidation = [
  body("id").isInt().withMessage("Child Id should be number"),
  body("fullName").isAlpha().withMessage("Name should be string"),
  body("age").isInt().withMessage("Age  should be integer"),
  body("level")
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level should be in PreKG,KG1,KG2"),
  body("address").optional().isObject().withMessage("address should be string"),
  body("address.city").isAlpha().withMessage("city should be string"),
  body("address.street").isInt().withMessage("street should be number"),
  body("address.building").isInt().withMessage("Bulding should be number"),
];

module.exports.updateChildValidation = [
  body("id").isInt().withMessage("Child Id should be number"),
  body("fullName").optional().isAlpha().withMessage("Name should be string"),
  body("age").optional().isInt().withMessage("Age  should be integer"),
  body("level")
    .optional()
    .isIn(["PreKG", "KG1", "KG2"])
    .withMessage("level should be in PreKG,KG1,KG2"),
  body("address").optional().isObject().withMessage("address should be string"),
  body("address.city")
    .optional()
    .isAlpha()
    .withMessage("city should be string"),
  body("address.street")
    .optional()
    .isInt()
    .withMessage("street should be number"),
  body("address.building")
    .optional()
    .isInt()
    .withMessage("Bulding should be number"),
];

module.exports.deleteChildValidation = [
  body("id").isInt().withMessage("Child Id should be number"),
];

module.exports.getChildById = [
  param("id").isInt().withMessage("Child Id should be number"),
];
