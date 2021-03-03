const mongoose = require("mongoose");

exports.connectDB = async () => {
  try {
    const DbConnection = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
    });

    console.log(
      `Database successfully connected: ${DbConnection.connection.host}`
    );
  } catch (err) {
    console.log(err);
  }
};