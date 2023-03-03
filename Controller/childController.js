const mongoose = require("mongoose");
require("./../Model/childModel");
const ChildSchema = mongoose.model("children");

module.exports.getAllChildren = (request, response, next) => {
  ChildSchema.find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
module.exports.getChildrenById = (request, response, next) => {
  ChildSchema.findOne({ _id: request.params.id })
    .then((data) => {
      if (data == null) throw new Error("Child not found");
      else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addChild = (request, response, next) => {
  let childObject = new ChildSchema({
    _id: request.body.id,
    fullName: request.body.fullName,
    age: request.body.age,
    level: request.body.level,
    address: request.body.address,
  });
  childObject
    .save()
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.updateChild = (request, response, next) => {
  ChildSchema.updateOne(
    { _id: request.body.id },
    {
      $set: {
        fullName: request.body.fullName,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address,
      },
    }
  )
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.deleteChild = (request, response, next) => {
  ChildSchema.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
