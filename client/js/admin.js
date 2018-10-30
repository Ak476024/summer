angular
    .module("Facts")
    .controller("adminCtrl", ["DataService",
        AdminController
    ]);

function AdminController(DataService) {
    let vm = this;
    vm.show = true;
    vm.submitquiz = submitquiz;
    vm.DataService = DataService;
    vm.updateQuestion = updateQuestion;
    vm.editquiz = editquiz;

    $("#my").on("hidden.bs.modal", function () {
        vm.type = "";
        vm.question = "";
        vm.answer1 = "";
        vm.answer2 = "";
        vm.answer3 = "";
        vm.answer4 = "";
        vm.correct = "";
    });

    function updateQuestion(ques) {
        vm.type = ques.type;
        vm.question = ques.text;
        vm.answer1 = ques.possibilities[0].answer;
        vm.answer2 = ques.possibilities[1].answer;
        vm.answer3 = ques.possibilities[2].answer;
        vm.answer4 = ques.possibilities[3].answer;
        vm.correct = ques.answer;
        vm.id = ques._id;
    }

    function submitquiz() {
        let data = {
            type: vm.type,
            text: vm.question,
            possibilities: [
                { answer: vm.answer1 },
                { answer: vm.answer2 },
                { answer: vm.answer3 },
                { answer: vm.answer4 }
            ],
            answer: vm.correct,
            selected: null,
            correct: null
        };
        DataService.addQuestion(data);
        vm.type = "";
        vm.question = "";
        vm.answer1 = "";
        vm.answer2 = "";
        vm.answer3 = "";
        vm.answer4 = "";
        vm.correct = "";
    }
    function editquiz(id) {

        let data = {
            type: vm.type,
            text: vm.question,
            possibilities: [
                { answer: vm.answer1 },
                { answer: vm.answer2 },
                { answer: vm.answer3 },
                { answer: vm.answer4 }
            ],
            answer: vm.correct
        };
        DataService.updateQuestion(data, id);
        vm.type = "";
        vm.question = "";
        vm.answer1 = "";
        vm.answer2 = "";
        vm.answer3 = "";
        vm.answer4 = "";
        vm.correct = "";
    }

}
