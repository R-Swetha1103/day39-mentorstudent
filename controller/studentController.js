const studentModel = require('../Models/studentModel');

// Get all students
const getAllStudents = async (req, res) => {
  try {
    const students = await studentModel.find();
    res.status(200).send({
      message: "Students Data Fetched Successfully",
      students, 
    });
  } catch (error) {
    console.error("Error fetching students:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined, 
    });
  }
};

// Get a single student by ID
const getStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (student) {
      res.status(200).send({
        message: "Student Data Fetched Successfully",
        student,
      });
    } else {
      res.status(404).send({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.error("Error fetching student:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined, 
    });
  }
};

// Add a new student
const addStudent = async (req, res) => {
  try {
    const student = await studentModel.findOne({ email: req.body.email });
    if (!student) {
      await studentModel.create(req.body);
      res.status(201).send({
        message: "Student Added Successfully",
      });
    } else {
      res.status(400).send({
        message: `Student with '${req.body.email}' already exists`,
      });
    }
  } catch (error) {
    console.error("Error adding student:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a student
const deleteStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (student) {
      await studentModel.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "Student Deleted Successfully",
      });
    } else {
      res.status(404).send({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.error("Error deleting student:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Edit a student's details
const editStudent = async (req, res) => {
  try {
    const student = await studentModel.findById(req.params.id);
    if (student) {
      const result = await studentModel.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      if (result.modifiedCount > 0) {
        res.status(200).send({
          message: "Student Updated Successfully",
        });
      } else {
        res.status(400).send({
          message: "No Changes Made",
        });
      }
    } else {
      res.status(404).send({
        message: "Student Not Found",
      });
    }
  } catch (error) {
    console.error("Error updating student:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Export all functions as an object
module.exports = {
  getAllStudents,
  getStudent,
  addStudent,
  deleteStudent,
  editStudent,
};
