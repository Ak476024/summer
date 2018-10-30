angular
  .module("Facts")
  .controller("listCtrl", [
    "quizMetrix",
    ListController
  ]);

function ListController(quizMetrix) {
  let vm = this;
  vm.show = true;
  vm.quizMetrix = quizMetrix;
  vm.activateQuiz = activateQuiz;

  function activateQuiz() {
    quizMetrix.changeState("quiz", true);
  }
}
