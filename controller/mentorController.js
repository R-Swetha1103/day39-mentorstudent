const mentorModel = require('../Models/mentorModel');
const studentModel = require('../Models/studentModel');

const getAllMentors = async (req, res) => {
  try {
    const mentors = await mentorModel.find();
    res.status(200).send({
      message: "Mentors data fetched successfully",
      mentors, 
      count: mentors.length, 
    });
  } catch (error) {
    console.error("Error fetching mentors:", error.message); 
    res.status(500).send({
      message: "Internal Server Error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined, 
    });
  }
};

// Add a New Mentor
const addMentor = async (req, res) => {
  try {
    const user = await mentorModel.findOne({ email: req.body.email });

    if (!user) {
      await mentorModel.create(req.body);
      res.status(200).send({
        message: "Mentor Added Successfully",
      });
    } else {
      res.status(400).send({
        message: `Mentor with '${req.body.email}' already exists`,
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Delete a Mentor
const deleteMentor = async (req, res) => {
  try {
    const user = await mentorModel.findOne({ _id: req.params.id });
    if (user) {
      await mentorModel.deleteOne({ _id: req.params.id });
      res.status(200).send({
        message: "Mentor Deleted Successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Mentor Id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};

// Show all students for a particular mentor
const mentorStudentList = async (req, res) => {
  try {
    const mentor = await mentorModel.findOne({ _id: req.params.id });
    const students = await studentModel.find({ mentor: req.params.id });
    if (mentor) {
      res.status(200).send({
        message: "Fetched Students List Successfully",
        mentor,
        students,
      });
    } else {
      res.status(400).send({
        message: "Mentor Id Not Valid",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Add Batch
const addBatch = async (req, res) => {
  try {
    const id = req.params.id;
    const batch = req.body.batch; 

    const findBatch = await mentorModel.findOne({ _id: id, batch: batch });
    if (findBatch) {
      return res.status(400).send({
        message: `Batch with ${batch} already exists`,
      });
    }

    await mentorModel.updateOne(
      { _id: id },
      { $push: { batch: batch } } 
    );

    res.status(200).send({
      message: "Batch updated successfully",
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Edit Mentor
const editMentor = async (req, res) => {
  try {
    const mentor = await mentorModel.findOne({ _id: req.params.id });
    if (mentor) {
      await mentorModel.updateOne({ _id: req.params.id }, { $set: req.body });
      res.status(200).send({
        message: "Mentor updated successfully",
      });
    } else {
      res.status(400).send({
        message: "Invalid Mentor Id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Get One Mentor
const getOneMentor = async (req, res) => {
  try {
    const mentor = await mentorModel.findOne({ _id: req.params.id });
    if (mentor) {
      res.status(200).send({
        message: "Mentor data fetched successfully",
        mentor,
      });
    } else {
      res.status(400).send({
        message: "Invalid Mentor Id",
      });
    }
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Export all functions as an object
module.exports = {
  getAllMentors,
  addMentor,
  deleteMentor,
  mentorStudentList,
  addBatch,
  editMentor,
  getOneMentor,
};
