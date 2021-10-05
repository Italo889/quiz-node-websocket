const socket = io();
let questionNum = 1; //Starts at two because question 1 is already present

function updateDatabase(){
    let questions = [];
    let name = document.getElementById('name').value;
    for(let i = 1; i <= questionNum; i++){
        let question = document.getElementById('q' + i).value;
        let answer1 = document.getElementById(i + 'a1').value;
        let answer2 = document.getElementById(i + 'a2').value;
        let answer3 = document.getElementById(i + 'a3').value;
        let answer4 = document.getElementById(i + 'a4').value;
        let correct = document.getElementById('correct' + i).value;
        let answers = [answer1, answer2, answer3, answer4];
        questions.push({"question": question, "answers": answers, "correct": correct})
    }
    
    let quiz = {id: 0, "name": name, "questions": questions};
    socket.emit('newQuiz', quiz);

    console.log(clicado)
}

function addQuestion(){
    questionNum += 1;
    
    let questionsDiv = document.getElementById('allQuestions');
    
    let newQuestionDiv = document.createElement("div");
    
    let questionLabel = document.createElement('label');
    let questionField = document.createElement('input');
    
    let answer1Label = document.createElement('label');
    let answer1Field = document.createElement('input');
    
    let answer2Label = document.createElement('label');
    let answer2Field = document.createElement('input');
    
    let answer3Label = document.createElement('label');
    let answer3Field = document.createElement('input');
    
    let answer4Label = document.createElement('label');
    let answer4Field = document.createElement('input');
    
    let correctLabel = document.createElement('label');
    let correctField = document.createElement('input');
    
    questionLabel.innerHTML = "Questão " + String(questionNum) + ": ";
    questionField.setAttribute('class', 'question');
    questionField.setAttribute('id', 'q' + String(questionNum));
    questionField.setAttribute('type', 'text');
    
    answer1Label.innerHTML = "Resposta 1: ";
    answer2Label.innerHTML = " Resposta 2: ";
    answer3Label.innerHTML = "Resposta 3: ";
    answer4Label.innerHTML = " Resposta 4: ";
    correctLabel.innerHTML = "Resposta correta (1-4): ";
    
    answer1Field.setAttribute('id', String(questionNum) + "a1");
    answer1Field.setAttribute('type', 'text');

    answer2Field.setAttribute('id', String(questionNum) + "a2");
    answer2Field.setAttribute('type', 'text');
    answer3Field.setAttribute('id', String(questionNum) + "a3");
    answer3Field.setAttribute('type', 'text');
    answer4Field.setAttribute('id', String(questionNum) + "a4");
    answer4Field.setAttribute('type', 'text');
    correctField.setAttribute('id', 'correct' + String(questionNum));
    correctField.setAttribute('type', 'number');
    
    newQuestionDiv.setAttribute('id', 'question-field');//Sets class of div
    
    newQuestionDiv.appendChild(questionLabel);
    newQuestionDiv.appendChild(questionField);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer1Label);
    newQuestionDiv.appendChild(answer1Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer2Label);
    newQuestionDiv.appendChild(answer2Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer3Label);
    newQuestionDiv.appendChild(answer3Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(answer4Label);
    newQuestionDiv.appendChild(answer4Field);
    newQuestionDiv.appendChild(document.createElement('br'));
    newQuestionDiv.appendChild(correctLabel);
    newQuestionDiv.appendChild(correctField);
    
    questionsDiv.appendChild(document.createElement('br'));//Creates a break between each question
    questionsDiv.appendChild(newQuestionDiv);//Adds the question div to the screen
    
}

//Called when user wants to exit quiz creator
function cancelQuiz(){
    if (confirm("Você tem certeza que deseja sair? Todo o progresso será DELETADO!")) {
        window.location.href = "../";
    }
}

socket.on('startGameFromCreator', function(data){
    window.location.href = "../../host/?id=" + data;
});
