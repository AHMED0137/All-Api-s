const mongos = require("mongoose");
const Schema = mongos.Schema;
const StudentsSchema = new Schema(
  {
    Name: {
      type: String,
      required: true,
    },
    Age: {
      type: Number,
      required: true,
    },
    City: {
      type: String,
      required: true,
    },
  }
  // { timestamps: true }
);
module.exports = mongos.model("Student", StudentsSchema);
