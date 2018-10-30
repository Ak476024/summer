const mongoose = require("mongoose");

// quiz Schema
let QuizSchema = new mongoose.Schema({
  type: String,
  text: String,
  possibilities: [
    { answer: String },
    { answer: String },
    { answer: String },
    { answer: String }
  ],
  answer: Number,
  selected: String,
  correct: String
});

const quiz = (module.exports = mongoose.model("quizzes", QuizSchema));

// Get Books
module.exports.getQuestions = (callback, limit) => {
  quiz.find(callback).limit(limit);
};

// Add Question
module.exports.addQuestion = (quizs, callback) => {
  quiz.create(quizs, callback);
};

// Update Question //
module.exports.updateQuestion = (id, q, options, callback) => {
  var query = { _id: id };
  var update = {
    type: q.type,
    text: q.text,
    possibilities: [
      { answer: q.possibilities[0].answer },
      { answer: q.possibilities[1].answer },
      { answer: q.possibilities[2].answer },
      { answer: q.possibilities[3].answer }
    ],
    answer: q.answer,
    selected: null,
    correct: null
  };
  quiz.findOneAndUpdate(query, update, options, callback);
};

// Delete Question
module.exports.removeQuestion = (id, callback) => {
  var query = { _id: id };
  quiz.remove(query, callback);
};
