const mongoose = require("mongoose");
const addressSchema = new mongoose.Schema(
  {
    city: { type: String },
    street: { type: Number },
    buildingl: { type: Number },
  },
  { _id: false }
);
const ChildSchema = new mongoose.Schema({
  _id: Number,
  fullName: { type: String, required: true },
  age: { type: Number, required: true },
  level: {
    type: String,
    enum: ["PreKG", "KG1", "KG2"],
    required: true,
  },
  address: addressSchema,
});
mongoose.model("children", ChildSchema);
