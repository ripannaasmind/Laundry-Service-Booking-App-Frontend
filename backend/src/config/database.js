const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://asifnaasmind_db_user:NLCAxR6FbJKR6229@cluster0.b6lvmxv.mongodb.net/laundry_hub?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
