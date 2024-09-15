const express = require('express');
const studentController = require('../controller/studentController'); 

const studentRouter = express.Router();

// Route to get all students
studentRouter.get("/", studentController.getAllStudents); 

// Route to get a specific student by ID
studentRouter.get("/:id", studentController.getStudent); 

// Route to add a new student
studentRouter.post("/", studentController.addStudent);

// Route to delete a student by ID
studentRouter.delete("/:id", studentController.deleteStudent);

module.exports = studentRouter;
