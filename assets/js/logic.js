var currentQuestionIndex = 0;
var time = questions.length * 20;
var timeId;

var timer = document.getElementById("time");
var allQuestions = document.getElementById('questions');
var allChoices = document.getElementById('choices');
var initialsE1 = document.getElementById('playerName');
var feedback = document.getElementById('feedback');
var submitBtn = document.getElementById('submit');
var start = document.getElementById('start-quiz');

var soundRight = new Audio ('./assets/sfx/correct.wav');
var soundWrong = new Audio ('./assets/sfx/incorrect.wav');

//This function kicks off the quiz
function startQuiz() {
    var start = document.getElementById('start-quiz');
    var instructions = document.getElementById('instructions');
    start.setAttribute('class','hide');
    instructions.setAttribute('class','hide');
    allQuestions.removeAttribute = ('class');
    timeId = setInterval(clock, 1000);
    timer.textContent = time;
     getQuestion();
}

// this function allows the question to be rendered from the questions.js document

function getQuestion() {

    choices.innerHTML = ''

    var currentQuestion = questions[currentQuestionIndex];

    var title = document.getElementById('question-title');

    title.textContent = currentQuestion.title;

     allQuestions.style.display = 'block';
     
     //the following code displays all of the choices available for a question as a button

    for (var i = 0; i < currentQuestion.choices.length; i++) {

        var choice = currentQuestion.choices[i];
        
        var choiceNode = document.createElement('button');
 
         choiceNode.setAttribute('id', 'choices');
         
        choiceNode.textContent = choice;

        allChoices.appendChild(choiceNode);
    }
}

//the following function is to hide the choice buttons from the previous questions 
function hideChoices() {
    var choiceButtons = allChoices.getElementsByTagName('button');
    for (var i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].style.display = 'none';
    }
}


//the following function outlines the event that happens when clicking an answer 

function clickAnswer(event) {
    var button1 = event.target;

    if (!button1.matches('button')) {
        return;
    }

    if (!questions[currentQuestionIndex]) {
        quizEnd();
        return;
    }

    if (button1.textContent !== questions[currentQuestionIndex].answer) {
        time -= 10;

        if (time < 0) {
            time = 0;
        }

    timer.textContent = time;
    soundWrong.play();
    feedback.textContent = 'Wrong answer!';
    } else {
        soundRight.play();
        feedback.textContent = 'Correct!';
        }

    feedback.className === 'feedback';
    setTimeout(function () {
        feedback.setAttribute('class', 'feedback-hide');
    }, 1000);

    hideChoices();

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length) {
        quizEnd();
    } else {
       getQuestion();
    }
}

function quizEnd() {
    clearInterval(timeId);

    allQuestions.setAttribute('class', 'hide');

    var endScreen = document.getElementById('summary');
    endScreen.removeAttribute('class');

    var finalScore = document.getElementById('final-score');
    finalScore.textContent = time;


}


function clock() {
    time--;
    timer.textContent = time;

    if (time <= 0) { quizEnd(); }
}


function saveScores(event) {
    event.preventDefault();

    var initialsE1 = document.getElementById('playerName');
    var playerName = initialsE1.value.trim();

    if (playerName !== '') {
        var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

        var newScore = {
            score: time,
            playerName: playerName,
        };

        highscores.push(newScore);
        window.localStorage.setItem('highscores', JSON.stringify(highscores));

        window.location.href = 'highscores.html';
    }
}

//Allows the user to click enter instead of button shown to submit their high score
function checkForEnter(event) {
    if (event.key === 'Enter') {
        saveScores();
    }
}

if (submitBtn){
submitBtn.onclick = saveScores;
}

if(start){
start.onclick = startQuiz;
}


if (allChoices) {
    var choiceButtons = allChoices.getElementsByTagName('button');
    for (var i = 0; i < choiceButtons.length; i++) {
    choiceButtons[i].addEventListener('click', clickAnswer);
    }
}


if(initialsE1){
initialsE1.onkeyup = checkForEnter;
}

allChoices.addEventListener('click',clickAnswer);
var initialsForm = document.getElementById('initials-form');
if (initialsForm) {
    initialsForm.addEventListener('submit', saveScores);
}

