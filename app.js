const express = require("express");
const mongos = require("mongoose");
const app = express();
const router = express.Router();
require("dotenv").config();
app.use(express.json());
const StudentSchema = require("./modal/modal");
mongos
  .connect(process.env.MONGOS_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("database connected to port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

// get all data
const getstudent = async (req, res) => {
  const alldata = await StudentSchema.find({}).sort({ createdAt: -1 });
  res.status(200).json(alldata);
};
app.use("/Getapi/students", router.get("/", getstudent));

// app.get("/read", (res, req) => {
//   StudentSchema.find((err, data) => {
//     if (err) {
//       return res.status(500).send(err);
//     } else {
//       return res.status(200).send(data);
//     }
//   });
// });

// add data to database
const addStudent = async (req, res) => {
  const { Name, Age, City } = req.body;
  try {
    const student = await StudentSchema.create({ Name, Age, City });
    res.status(200).json(student);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
app.use("/Createapi/students", router.post("/", addStudent));

// get single data
const getSingleStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongos.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }
  const student = await StudentSchema.findById(id);
  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json(student);
};
app.use("/Getsingleapi/students", router.get("/:id", getSingleStudent));

// delete single data
const deleteStudent = async (req, res) => {
  const { id } = req.params;
  if (!mongos.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }
  const student = await StudentSchema.findByIdAndDelete(id);
  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json({ Success: " student deleted" });
};
app.use("/Deleteapi/students", router.delete("/:id", deleteStudent));

// Update single data
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const City = req.body.City;
  if (!mongos.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such student" });
  }
  const student = await StudentSchema.findByIdAndUpdate(id, {
    $set: { City: City },
  });
  if (!student) {
    return res.status(404).json({ error: "No such student" });
  }
  res.status(200).json({ Success: " student Updated" });
};
app.use("/Updateapi/students", router.patch("/:id", updateStudent));
