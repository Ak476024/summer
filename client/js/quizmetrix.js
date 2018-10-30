angular.module("Facts").factory("quizMetrix", ["DataService", QuizMetrix]);
function QuizMetrix(DataService) {
  var quizobj = {
    quizActive: false,
    resultActive: false,
    changeState: changeState,
    correctAnswers: [],
    markQuiz: markQuiz,
    numCorrct: 0
  };
  return quizobj;

  function markQuiz() {
    quizobj.correctAnswers = DataService.correctAnswer;
    for (let i = 0; i < DataService.quizQuestions.length; i++) {
      if (
        DataService.quizQuestions[i].selected == DataService.correctAnswer[i]
      ) {
        DataService.quizQuestions[i].correct = true;
        quizobj.numCorrct++;
      } else {
        DataService.quizQuestions[i].correct = false;
      }
    }
  }

  function changeState(Metrix, state) {
    if (Metrix == "quiz") {
      quizobj.quizActive = state;
    } else if (Metrix == "results") {
      quizobj.resultActive = state;
    } else {
      return false;
    }
  }
}
