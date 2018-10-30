angular
  .module("Facts")
  .controller("quizctrl", ["quizMetrix", "DataService", QuizController]);

function QuizController(quizMetrix, DataService) {
  var vm = this;
  vm.quizMetrix = quizMetrix;
  vm.DataService = DataService;
  vm.activeQuestion = 0;
  vm.QuestionAnswered = QuestionAnswered;
  vm.setActiveQuestion = setActiveQuestion;
  vm.selectedAnswer = selectedAnswer;
  vm.finaliseAnswers = finaliseAnswers;
  var numQuestionAnswered = 0;
  vm.error = false;
  vm.finalise = false;

  function finaliseAnswers() {
    numQuestionAnswered = 0;
    vm.activeQuestion = 0;
    quizMetrix.markQuiz();
    quizMetrix.changeState("quiz", false);
    quizMetrix.changeState("results", true);
  }

  function setActiveQuestion(index) {
    if (index === undefined) {
      var breakout = false;
      var quizlength = DataService.quizQuestions.length - 1;
      while (!breakout) {
        vm.activeQuestion =
          vm.activeQuestion < quizlength ? ++vm.activeQuestion : 0;
        if (vm.activeQuestion == 0) {
          vm.error = true;
        }
        if (DataService.quizQuestions[vm.activeQuestion].selected === null) {
          breakout = true;
        }
      }
    } else {
      vm.activeQuestion = index;
    }
  }

  function QuestionAnswered() {
    var quizlength = DataService.quizQuestions.length;
    if (DataService.quizQuestions[vm.activeQuestion].selected !== null) {
      numQuestionAnswered++;
      if (numQuestionAnswered >= quizlength) {
        for (let i = 0; i < quizlength; i++) {
          if (DataService.quizQuestions[i].selected === null) {
            setActiveQuestion(i);
            return;
          }
        }
        vm.error = false;
        vm.finalise = true;
        return;
      }
    }
    vm.setActiveQuestion();
  }

  function selectedAnswer(index) {
    DataService.quizQuestions[vm.activeQuestion].selected = index;
  }
}
