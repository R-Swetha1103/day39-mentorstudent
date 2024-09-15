const mongoose = require('mongoose');

// Function to validate email addresses
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
};

// Define the student schema
const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: validateEmail,
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    mentor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mentor', 
    },
    batch: {
      type: String,
      required: [true, "Batch is required"],
    },
    previous_mentors: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Mentor' }], 
  },
  {
    collection: 'student',
    versionKey: false,
  }
);

module.exports = mongoose.model('Student', studentSchema); 
