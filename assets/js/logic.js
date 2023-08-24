var currentQuestionIndex = 0;
var time = questions.length *20;
var timeId
var timer = document.getElementById ("time");
var allQuestions = document.getElementById('questions');
var allChoices = document.getElementById('choices');
var initials = document.getElementById('playerName');
var feedback = document.getElementById('feedback');
var submit = document.getElementById('submit');
var start = document.getElementById('start-quiz')
var soundRight = new Audio('/assets/sfx/correct.wav')
var soundWrong = new Audio('/assets/sfx/incorrect.wav')

function startQuiz ()
    {
    var start = document.getElementById('start-quiz')
    start.setAttribute('class','hide')
    };

allQuestions.removeAttribute =('class');

timeId = setInterval(() 
    {
        timer.textContent = time;
        getQuestion()
    },1000);

function getQuestion(){
    var currentQuestion = questions[currentQuestionIndex];

    var title =document.getElementById('question-title');
    title.textContent =currentQuestion.title;

    allChoices.innerHTML='';

    for(var=initials;i<currentQuestion.allChoices.length,i++)
    {
        var choice = currentQuestion.choices[i];
        var choiceNode = document.createElement('button');
        choiceNode.setAttribute = ('class','choices');
        choiceNode.setAtrribute = ('value', choice);

        choice.textContent = i + 1 +' . ' +choice;

        allChoices.appendChild(choiceNode);
    }

    function clickQ (event) 
    {
        var button1 = event.target;

        if(!button1.matches('choice'))
        
        {return;
        }

        if(button1.value !==questions[currentQuestionIndex].answersArray)
        {
            time -=15;

            if (time < 0) 
            {
                time=0;
            }
        }

        timer.textContent=time;

        sfxWrong.play();

        feedback.textContent = 'Wrong answer!';

    } else 
    {
        sfxRight.play();

        feedback.textContent = 'Correct!';
    }

    feedback.setAttribute('class','feedback');
    setTimeout(function () {
        feedback.setAtrribute('class','feedback-hide');
    }, 1000);

    currentQuestionIndex++;

    if (time <= 0 || currentQuestionIndex === questions.length)
    {
        quizEnd();
    } else 
    {
        getQuestion();
    }
 }

 function quizEnd()
 {
    clearInterval(timeId);

    var endScreen = document.getElementById('end-screen');
    endScreen.removeAttribute('class');

    var finalScore =document.getElementById('final-score');
    finalScore.textContent = time;

    questions.setAtrribute('class','hide');
 }

 function clock()
 {
    time--;
    timer.textContent = time;

    if (time<= 0)
    {quizEnd();}
 }

 function saveScores () 
 {
    var initials1 = initials.value.trim();

    if (initials !== '') {
        var highscores =
      JSON.parse(window.localStorage.getItem('highscores'))
      
      var newScore = {
        score: time,
        initials: initials,
      };|| [];

      highscores.push(newScore);
      window.localStorage.setItem('highscores', JSON.stringify(highscores));

      window.location.href = 'highscores.html';

      function checkForEnter(event) {
        if (event.key === 'Enter') {
            saveHighscore();
          }
        }
    }

        submit.onclick = saveHighscore;
        start.onclick = startQuiz;
        allChoices.onclick = questionClick;
        initials.onkeyup = checkForEnter;
 }

