document.addEventListener('DOMContentLoaded', function () {
    var highscoreList = document.getElementById('highscores');

    // Retrieve highscores from local storage
    var highscores = JSON.parse(localStorage.getItem('highscores')) || [];

    // Sort highscores by score in descending order
    highscores.sort(function (a, b) {
        return b.score - a.score;
    });

    // Iterate through highscores and create list items to display them
    highscores.forEach(function (scoreObj) {
        var listItem = document.createElement('li');
        listItem.textContent = scoreObj.playerName + ': ' + scoreObj.score;
        highscoreList.appendChild(listItem);
    });
});
