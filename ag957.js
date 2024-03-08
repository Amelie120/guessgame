document.addEventListener('DOMContentLoaded', function () {
    const startButton = document.getElementById("startbutton");
    const radioButtons = document.querySelectorAll('input[name="range"]');
    const feedback = document.getElementById("feedback");
    const guessInput = document.getElementById("guessthenumber");
    const guessesLeftElement = document.getElementById("guesslist");
    const guessList = document.getElementById("guesslist");
    let minNum = 1;
    let maxNum;
    let answer;
    let attempts = 0;
    let running = false;
    let guessesLeft;

    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            const range = radio.value.split('-');
            minNum = parseInt(range[0], 10);
            maxNum = parseInt(range[1], 10);
            startButton.disabled = false;
        });
    });

    startButton.addEventListener('click', function () {
        answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        document.getElementById("gameSetup").style.display = "none";
        document.getElementById("game").style.display = "block";
        document.getElementById("instructions").textContent = `Guess a number between ${minNum} and ${maxNum}`;
        running = true;
        attempts = 0;
        guessesLeft = 3; // Set the number of guesses to 5 for testing
        guessesLeftElement.textContent = `Guesses left: ${guessesLeft}`;
        guessList.innerHTML = '';
        document.getElementById('guess-table-body').innerHTML = ''; // Clear the table
    });

    const checkButton = document.getElementById("checkbutton");
    checkButton.addEventListener('click', function () {
        if (!running) return;
        const userGuess = parseInt(guessInput.value, 10);

        if (isNaN(userGuess) || userGuess < minNum || userGuess > maxNum) {
            alert('Please enter a valid number within the selected range.');
            return;
        }

        attempts++;
        guessesLeft--;

        let result;
        if (userGuess === answer) {
            result = 'Correct!';
            endGame('Congratulations!');
        } else if (guessesLeft > 0) {
            guessesLeftElement.textContent = `Guesses left: ${guessesLeft}`;
            result = userGuess < answer ? 'Too low' : 'Too high';
            feedback.textContent = result + '. Try again!';
        } else {
            result = 'Out of guesses';
            endGame('No more guesses left.');
        }

        insertGuessRow(userGuess, result);
        guessInput.value = '';
    });

    function insertGuessRow(guess, result) {
        const tableBody = document.getElementById('guess-table-body');
        const row = tableBody.insertRow();
        const guessCell = row.insertCell();
        const resultCell = row.insertCell();
        guessCell.textContent = guess;
        resultCell.textContent = result;
    }

    function endGame(message) {
        const modal = document.getElementById('modal');
        const modalMessage = document.getElementById('modal-message');
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    const playAgainButton = document.getElementById('play-again-button');
    playAgainButton.addEventListener('click', function () {
        location.reload();
    });
});