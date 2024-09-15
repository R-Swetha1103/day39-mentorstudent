const express = require('express');
const mentorController = require('../controller/mentorController'); 

const mentorRouter = express.Router();

// Route to get all mentors
mentorRouter.get("/", mentorController.getAllMentors); 

// Route to add a new mentor
mentorRouter.post("/", mentorController.addMentor);

// Route to delete a mentor by ID
mentorRouter.delete("/:id", mentorController.deleteMentor);

// Route to get a list of students for a specific mentor by ID
mentorRouter.get("/students/:id", mentorController.mentorStudentList);

// Route to add a batch to a specific mentor by ID
mentorRouter.put("/:id/batch", mentorController.addBatch); 

// Route to edit a mentor by ID
mentorRouter.put("/:id", mentorController.editMentor); 

// Route to get details of a single mentor by ID
mentorRouter.get("/:id", mentorController.getOneMentor); 

module.exports = mentorRouter;
