const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
// const PORT = 3001;
// initialize express 
const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
// having server issues - pulling from tech-bo to resolve 
// mongoose.connect(
//   process.env.mongodb || 'mongodb://localhost/no-broke-jokes', 
//   { - needs to be all caps for mongodb_uri
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/no-broke-jokes", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});