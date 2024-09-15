const mongoose = require('mongoose');

// Function to validate email addresses
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    );
};

// Define the mentor schema
const mentorSchema = new mongoose.Schema(
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
    students: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Student', 
      },
    ],
    batch: [{ type: String }],
  },
  {
    collection: 'mentor',
    versionKey: false,
  }
);

module.exports = mongoose.model('Mentor', mentorSchema);
