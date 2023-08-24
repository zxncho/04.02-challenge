function printScores () {
    var highScores = JSON.parse(window.localStorage.getItem('highscores')) || [];
};

    highScores.sort (function(a,b) {
        return b.score-a.score;
});

for (var i = 0; i < highScores.length; i+=1) {
    var listItem = document.createElement('li');
    listItem.textContent = highScores[i].initials + ' - ' +highScores[i].score;

    var fullList = document.getElementById ('highscores');
    fullList.appendChild(listItem)
}

function clearScores () {
    window.localStorage.removeItem ('highscores');
    window.location.reload();
}

document.getElementById('clear').onclick = clearScores;

printScores();