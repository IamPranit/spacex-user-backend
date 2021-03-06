const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const { connectDB } = require("./db/connectMongoDB");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// Import Routes
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const spacexRoutes = require("./routes/spacex");

dotenv.config({ path: "./config/config" });
connectDB();

app.use(express.json());

const  whitelist = ['http://localhost:3000', "https://spacexlaunchdashboard.herokuapp.com" ];

const  corsOptions = {
  credentials: true,
  origin: function(origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(corsOptions);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.options('*', cors());
app.use(cookieParser());

if ((process.env.NODE_ENV = "development")) {
  app.use(morgan("dev"));
}

// Mount Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/spacex", spacexRoutes);

// PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on Port ${ PORT }`);
});
