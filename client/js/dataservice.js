angular.module("Facts").factory("DataService", DataService);
function DataService($http) {
  var dataObj = {
    correctAnswer: [],
    quizQuestions: [],
    showQuiz: showQuiz,
    addQuestion: addQuestion,
    removeQuestion: removeQuestion,
    updateQuestion: updateQuestion
  };

  return dataObj;

  function updateQuestion(data, id) {
    $http({
      method: "PUT",
      url: `/api/quizes/${id}`,
      data: data,
      headers: { "Content-Type": "application/json" }
    }).then(function (data) {
      showQuiz();
    });
  }

  function removeQuestion(id) {
    $http({
      method: "DELETE",
      url: `/api/quizes/${id}`
    }).then(function (data) {
      showQuiz();
    });
  }

  function addQuestion(data) {
    $http({
      method: "POST",
      url: "/api/quizes",
      data: data,
      headers: { "Content-Type": "application/json" }
    }).then(function (data) {
      showQuiz();
    });
  }
  function correctAnswers(data) {
    dataObj.correctAnswer = [];
    for (i of data) {
      dataObj.correctAnswer.push(i.answer);
    }
  }
  function showQuiz() {
    $http({
      method: "GET",
      url: "/api/quizes"
    }).then(
      function successCallback(response) {
        dataObj.quizQuestions = response.data;
        correctAnswers(response.data);
      },
      function errorCallback(response) {
        console.log(response);
      }
    );
  }
}
