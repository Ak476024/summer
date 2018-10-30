angular
  .module("Facts")
  .controller("resultctrl", ["quizMetrix", "DataService", Resultcontroller]);

function Resultcontroller(quizMetrix, DataService) {
  var vm = this;
  vm.quizMetrix = quizMetrix;
  vm.DataService = DataService;
  vm.activeQuestion = 0;
  vm.setActiveQuestion = setActiveQuestion;
  vm.setClass = setClass;
  vm.calculateper = calculateper;
  vm.reset = reset;

  function calculateper() {
    return (quizMetrix.numCorrct / DataService.quizQuestions.length) * 100;
    console.log("inside");
  }

  function setActiveQuestion(index) {
    vm.activeQuestion = index;
  }
  function setClass(index) {
    if (index === quizMetrix.correctAnswers[vm.activeQuestion]) {
      return "bg-success";
    } else if (
      index === DataService.quizQuestions[vm.activeQuestion].selected
    ) {
      return "bg-danger";
    }
  }
  function reset() {
    quizMetrix.changeState("results", false);
    quizMetrix.numCorrct = 0;
    for (let i = 0; i < DataService.quizQuestions.length; i++) {
      let data = DataService.quizQuestions[i];
      data.selected = null;
      data.correct = null;
    }
  }
}
