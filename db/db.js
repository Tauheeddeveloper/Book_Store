const { MongoClient } = require('mongodb'); // MongoDB client import karte hain

// Local MongoDB connection string
const mongo_url = "mongodb://localhost:27017/Book_Data";

// MongoDB Client ko initialize karte hain
const mongoConnect = (callback) => {
  MongoClient.connect(mongo_url) // no need for useNewUrlParser and useUnifiedTopology
    .then((client) => {
      console.log("Connected to MongoDB successfully!"); // Success message
      callback(client); // MongoDB client ko callback mein pass karte hain
    })
    .catch((err) => {
      console.log("Error occurred while connecting to MongoDB:", err); // Error message agar connection fail ho
    });
};

// Export MongoDB connection function
module.exports = mongoConnect;
