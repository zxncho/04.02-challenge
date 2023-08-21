var timer = document.getElementById (".timer")

function countdown() {
    var startingTime = 60;

    var timeRemaining = setInterval(function (){

        if (timeRemaining > 0);
        timer.textContent = startingTime + 'seconds remaining';
        timeRemaining --;
    }

        else if (timeRemaining === 1) {

            timer.textContent = startingTime + 'second remaining';
            timeRemaining --;

        }

        else {
            timer.textContent =''
        }
    })
}