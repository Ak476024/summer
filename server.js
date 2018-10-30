const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

Quiz = require("./models/quiz");
User = require("./models/login");

// Connect to Mongoose
mongoose
  .connect(
    "mongodb://@ds125073.mlab.com:25073/quizapp",
    {
      auth: {
        user: "ankitquiz",
        password: "ankit476024"
      },
      useNewUrlParser: true
    }
  )
  .then(() => {
    console.log("connencted");
  })
  .catch(err => {
    /** handle initial connection error */

    console.log("Error in database connection. ", err);
  });
var db = mongoose.connection;

app.get("/api/quizes", (req, res) => {
  Quiz.getQuestions((err, quizes) => {
    if (err) {
      throw err;
    }
    res.json(quizes);
  });
});

app.post("/api/quizes", (req, res) => {
  var quiz = req.body;
  Quiz.addQuestion(quiz, (err, quiz) => {
    if (err) {
      throw err;
    }
    res.json(quiz);
  });
});

app.put("/api/quizes/:_id", (req, res) => {
  var id = req.params._id;
  var quiz = req.body;
  Quiz.updateQuestion(id, quiz, {}, (err, quiz) => {
    if (err) {
      throw err;
    }
    res.json(quiz);
  });
});

app.delete("/api/quizes/:_id", (req, res) => {
  var id = req.params._id;
  Quiz.removeQuestion(id, (err, quiz) => {
    if (err) {
      throw err;
    }
    res.json(quiz);
  });
});

app.post("/api/login", (req, res) => {
  var user = req.body;
  User.addUsers(user, (err, user) => {
    if (err) {
      throw err;
    }
    res.json(user);
  });
});

app.get("/api/login", (req, res) => {
  User.getUsers((err, users) => {
    if (err) {
      throw err;
    }
    res.json(users);
  });
});

app.put("/api/login/:_id", (req, res) => {
  var id = req.params._id;
  var user = req.body;
  User.updateUser(id, user, {}, (err, user) => {
    if (err) {
      throw err;
    }
    res.json(user);
  });
});

app.delete("/api/login/:_id", (req, res) => {
  var id = req.params._id;
  User.removeUser(id, (err, user) => {
    if (err) {
      throw err;
    }
    res.json(user);
  });
});

var port = process.env.PORT || 3000;

app.listen(port);
console.log("Running on port 3000...");
