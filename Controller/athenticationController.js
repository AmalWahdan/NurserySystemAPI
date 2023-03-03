const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const TeacherSchema = mongoose.model("teachers");
module.exports.login = (request, response, next) => {
  if (request.body.userName == "admin" && request.body.password == "123") {
    let token = jwt.sign(
      {
        role: "admin",
        id: 1,
        userName: "admin",
      },
      process.env.SECRETKEY,
      { expiresIn: "12h" }
    );
    response.status(200).json({ data: "admin", token });
  } else {
    TeacherSchema.findOne({
      fullName: request.body.userName,
      password: request.body.password,
    })
      .then((data) => {
        if (data == null) {
          let error = new Error("");
          throw error;
        } else {
          let token = jwt.sign(
            {
              role: "teacher",
              id: data._id,
              userName: data.fullName,
            },
            process.env.SECRETKEY,
            { expiresIn: "12h" }
          );
          response.status(200).json({ data: "teacher", token });
        }
      })
      .catch((error) => {
        error.message = "Not Athentication";
        error.status = 401;
        next(error);
      });
  }
};
