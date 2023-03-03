const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const ClassSchema = new mongoose.Schema(
  {
    _id: Number,
    name: { type: String, required: true, unique: true },
    supervisor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "teachers",
    },
    children: [{ type: Number, ref: "children" }],
  },
  { _id: false }
);

ClassSchema.plugin(AutoIncrement, { id: "classCounter" });
mongoose.model("classes", ClassSchema);
