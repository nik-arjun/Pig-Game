'use strict';

// Selecting Elements
const score0 = document.querySelector('#score--0');
const score1 = document.getElementById('score--1');
const dice = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

// Starting Condition
score0.textContent = 0;
score1.textContent = 0;
dice.classList.add('hidden');

// Declaring Variables
let finalScore = [0,0];
let currScore = 0;
let currPlayer = 0;
let playing = true;

// Switch Player Function
function switchPlayer () {
    currPlayer = currPlayer === 0 ? 1 : 0;
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
};


btnRoll.addEventListener('click', function () {
    if(playing) {
        // Generate a Random Number
        let diceRoll = Math.trunc(Math.random()*6 + 1);
        // Displaying the Dice Image acc. to rolled No.
        dice.classList.remove('hidden');
        dice.src = `dice-${diceRoll}.png`;
        // Check for dice rolled 1
        if(diceRoll === 1 ) {
            // Change Current Player Score to 0
            document.getElementById(`current--${currPlayer}`).textContent
                = 0;
            currScore = 0;
            // Switch Player
            //document.querySelector(`.player--${currPlayer}`).classList.remove('player--active');
            //document.querySelector(`.player--${currPlayer}`).classList.add('player--active');
            switchPlayer();
        }
        else {
            // Add Number Rolled to current score
            currScore += diceRoll;
            document.getElementById(`current--${currPlayer}`).textContent
                = currScore;
        }
    }
});

btnHold.addEventListener('click', function () {
    if(playing) {
        // Add current Score to the final score
        finalScore[currPlayer] += currScore;
        document.getElementById(`score--${currPlayer}`).textContent = finalScore[currPlayer];
        document.getElementById(`current--${currPlayer}`).textContent = 0;
        currScore = 0;
        // Check if Player Score is Greater than 100
        if(finalScore[currPlayer] > 100) {
            document.querySelector(`.player--${currPlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${currPlayer}`).classList.remove('player--active');
            playing = false;
        }
        else {
            // Switch the current Player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', function () {
    dice.classList.add('hidden');
    document.querySelector(`.player--${currPlayer}`).classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
    finalScore = [0,0];
    currPlayer = 0;
    currScore = 0;
    score0.textContent = 0;
    score1.textContent = 0;
    playing = true;
});
