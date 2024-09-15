//import the dotenv module
require('dotenv').config();
const MONGODB_URI = process.env.MONGODB_URI;
module.exports = {
    MONGODB_URI
}