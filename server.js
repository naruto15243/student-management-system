const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/student")
.then(()=>console.log("MongoDB Connected"));

const Student = require("./models/Student");

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/public/index.html");
   });
// Get all students
app.get("/students", async (req,res)=>{
 const students = await Student.find();
 res.json(students);
});

// Add student
app.post("/students", async (req,res)=>{
 const student = new Student({
  name:req.body.name,
  roll:req.body.roll
 });

 await student.save();
 res.json(student);
});
// Update student
app.put("/students/:id", async (req, res) => {

    const student = await Student.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            roll: req.body.roll
        },
        { new: true }
    );

    res.json(student);

});
// Delete student
app.delete("/students/:id", async(req,res)=>{
 await Student.findByIdAndDelete(req.params.id);
 res.send("Deleted");
});

app.listen(3000,()=>console.log("Server running on port 3000"));
