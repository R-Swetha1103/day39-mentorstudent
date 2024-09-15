const app = require('./app');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT = 3001 } = require('./utils/config'); 

// Connect to the MongoDB database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Connected to the MongoDB database");

        // Start the server by listening on a port for incoming requests
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the MongoDB database", err);
        process.exit(1); 
    });

