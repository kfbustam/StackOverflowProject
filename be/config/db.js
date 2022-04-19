const mongoose = require("mongoose");
  const connectDB = async () =>{
    const conn = await mongoose.connect("mongodb+srv://mongo:admin123@cluster0.wzi0v.mongodb.net/test?retryWrites=true&w=majority", {
      useNewURLParser: true,
      useUnifiedTopology : true
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
  }
  module.exports = connectDB;