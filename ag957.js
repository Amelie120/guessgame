document.addEventListener('DOMContentLoaded', function () {
    //initializing the variables for the game
    const startButton = document.getElementById("startbutton");
    const radioButtons = document.querySelectorAll('input[name="range"]');
    const feedback = document.getElementById("feedback");
    const guessInput = document.getElementById("guessthenumber");
    const guessesLeftElement = document.getElementById("guesslist");
    const guessList = document.getElementById("guesslist");
    //setting the minimum number to 1 as default and then the maximum number will be selected depending on the range
    let minNum = 1;
    let maxNum;
    let answer;
    let attempts = 0;
    //setting the game to false until it is started
    let running = false;
    let guessesLeft;

    //adding an event listener for each radio button so that it starts the game
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            //splitting the range into a minimum and maximum values and updating them
            const range = radio.value.split('-');
            minNum = parseInt(range[0], 10);
            maxNum = parseInt(range[1], 10);
            //setting the start button to work once a value is selected
            startButton.disabled = false;
        });
    });

    //setting up the game so that when the start button is clicked the game is started
    startButton.addEventListener('click', function () {
        //generating a random number in the selected range using math.random and floor
        answer = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
        document.getElementById("gameSetup").style.display = "none";
        document.getElementById("game").style.display = "block";
        //showing the instructions
        document.getElementById("instructions").textContent = `Guess a number between ${minNum} and ${maxNum}`;
        //setting the game to true so that it starts running
        running = true;
        attempts = 0;
        guessesLeft = getGuessesLeft(maxNum);
        //displaying the guesses left
        guessesLeftElement.textContent = `Guesses left: ${guessesLeft}`;
        //clearing guesses from before and the table
        guessList.innerHTML = '';
        document.getElementById('guess-table-body').innerHTML = '';
    });

    //checking button and values
    const checkButton = document.getElementById("checkbutton");

    //adding an event listener to the check button for when the player clicks
    checkButton.addEventListener('click', function () {
        //checking if the game is running and if not returning
        if (!running) return;
        //parse the guess as an intiger
        const userGuess = parseInt(guessInput.value, 10);
        //validating the guesses to make sure the number is in the range
        if (isNaN(userGuess) || userGuess < minNum || userGuess > maxNum) {
            //if not we return an alert telling the player to select another number within the range
            alert('Please enter a valid number within the selected range.');
            return;
        }
        //incrementing the number of attemps and decreasing the number of guesses left
        attempts++;
        guessesLeft--;

        //initializing the variable to hold the result
        let result;
        //checking if the urser's guess is the answer
        if (userGuess === answer) {
            //if the guess is correct say correct
            result = 'Correct!';
            endGame('Congratulations!');
            //if the answer is not correct then 
        } else if (guessesLeft > 0) {
            //updating the text contect of guessesLeft as the guess is not the answer
            guessesLeftElement.textContent = `Guesses left: ${guessesLeft}`;
            //check whether the guess is too high or low and setting it 
            result = userGuess < answer ? 'Too low' : 'Too high';
            //updating the feedback text to try again
            feedback.textContent = result + '. Try again!';
        } else {
            //if the user has no guesses left then set "out of guesses" and calling the endgame function to send a message that the game is finished
            result = 'Out of guesses';
            endGame('No more guesses left.');
        }

        //calling the function to insert a new row in the guess table with the new result
        insertGuessRow(userGuess, result);
        //clearing the guesses to start again
        guessInput.value = '';
    });

    //adding a function to set the number of guesses for each range 
    function getGuessesLeft(range) {
        if (range === 10) return 3;
        if (range === 100) return 7;
        if (range === 1000) return 10;
    }

    //creating a function to update and add a new row to the table with the players guesses as they are  playing
    function insertGuessRow(guess, result) {
        const tableBody = document.getElementById('guess-table-body');
        //inserting a new row at the end of the table
        const row = tableBody.insertRow();
        //inserting a new cell at the end of the table
        const guessCell = row.insertCell();
        //inserting a new cell for the result in the row
        const resultCell = row.insertCell();
        //setting the text content of the guess cell to the players guess and result
        guessCell.textContent = guess;
        resultCell.textContent = result;
    }

    //creating a function for the end of the game
    function endGame(message) {
        //getting the modal 
        const modal = document.getElementById('modal');
        //getting the modal message 
        const modalMessage = document.getElementById('modal-message');
        //setting the textcontent  of the modal message to send the message and displaying
        modalMessage.textContent = message;
        modal.style.display = 'block';
    }

    //adding a playbutton  using event listener and reloading the page
    const playAgainButton = document.getElementById('play-again-button');
    playAgainButton.addEventListener('click', function () {
        location.reload();
    });
});