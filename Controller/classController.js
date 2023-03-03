const mongoose = require("mongoose");
require("./../Model/classModel");
const ChildSchema = mongoose.model("children");
const TeacherSchema = mongoose.model("teachers");
const ClassSchema = mongoose.model("classes");

module.exports.getAllClasses = (request, response, next) => {
  ClassSchema.find({})
    .populate({ path: "supervisor", select: { fullName: 1 } })
    .populate({ path: "children", select: { fullName: 1 } })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getClassById = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id })
    .populate({ path: "supervisor", select: { fullName: 1 } })
    .populate({ path: "children", select: { fullName: 1 } })
    .then((data) => {
      if (request.id == data.supervisor._id || request.role == "admin") {
        if (data == null) throw new Error("Class not found");
        else response.status(200).json({ data });
      } else {
        let error = new Error("Not Authorized from calss");
        error.status = 403;
        throw error;
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.addClass = async (request, response, next) => {
  let classObject = new ClassSchema({
    name: request.body.name,
    age: request.body.age,
    supervisor: request.body.supervisor,
    children: request.body.children,
  });

  try {
    let data = await TeacherSchema.findOne(
      { _id: request.body.supervisor },
      { _id: 0, fullName: 1 }
    );

    if (data == null) throw new Error("supervisor does not exist");
    else {
      let data = await ChildSchema.find(
        {
          _id: { $in: request.body.children },
        },
        { _id: 0, fullName: 1 }
      );

      if (data.length < request.body.children.length)
        throw new Error("Child id does not exist");
      else {
        let data = await classObject.save();
        response.status(200).json({ data });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.updateClass = async (request, response, next) => {
  try {
    let data = await TeacherSchema.findOne(
      { _id: request.body.supervisor },
      { _id: 0, fullName: 1 }
    );
    if (data == null) throw new Error("supervisor does not exist");
    else {
      let data = await ChildSchema.find(
        {
          _id: { $in: request.body.children },
        },
        { _id: 0, fullName: 1 }
      );
      if (data.length < request.body.children.length)
        throw new Error("Child id does not exist");
      else {
        let data = await ClassSchema.updateOne(
          { _id: request.body.id },
          {
            $set: {
              name: request.body.name,
              supervisor: request.body.supervisor,
            },
            $addToSet: { children: request.body.children },
          }
        );
        response.status(200).json({ data });
      }
    }
  } catch (error) {
    next(error);
  }
};

module.exports.deleteClass = (request, response, next) => {
  ClassSchema.deleteOne({ _id: request.body.id })
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getClassChildern = (request, response, next) => {
  ClassSchema.findOne(
    { _id: request.params.id },
    { _id: 0, children: 1, supervisor: 1 }
  )
    .populate({ path: "children" })
    .then((data) => {
      if (request.id == data.supervisor || request.role == "admin") {
        if (data == null) throw new Error("Class not found");
        else response.status(200).json({ data });
      } else {
        let error = new Error("Not Authorized");
        error.status = 403;
        throw error;
      }
    })
    .catch((error) => {
      next(error);
    });
};

module.exports.getClassSupervisor = (request, response, next) => {
  ClassSchema.findOne({ _id: request.params.id }, { _id: 0, supervisor: 1 })
    .populate({ path: "supervisor" })
    .then((data) => {
      if (data == null) throw new Error("Class not found");
      else response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};
