'use strict';

//selecting elements
var score1El = document.querySelector('#score--1');
var score0El = document.querySelector('#score--0');
var diceEl = document.querySelector('.dice');
const new_game = document.querySelector('.btn');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//score variable
var scores, currentScore, activePlayer, playing; //player 0=>player 1 and player 1=>player 2

//starting conditions
score1El.textContent = 0;
score0El.textContent = 0;
diceEl.classList.add('hidden');

//reset the page or initializzation of the data on the page
const initialization = () => {
  currentScore = 0;
  activePlayer = 0; // Player 1
  scores = [0, 0];
  playing = true;

  //starting conditions
  score1El.textContent = 0;
  score0El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
initialization();

//switch player funcion (will be used to switch the players when they presssthe hold button)
const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active'); //remove the white background from the active player
  player1El.classList.toggle('player--active'); //add the white backgroun to the active player
};
//rolling a dice
btnRoll.addEventListener('click', () => {
  if (playing) {
    //1.Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    console.log(dice);
    //2.Display the dice number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //3.Check if the dice number is 1, then reset the current score
    if (dice != 1) {
      currentScore += dice; //change later to switch between the players
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;

      // current0El.textContent = currentScore;
      //console.log('currentscore is', currentScore);
    } else {
      //switch the player
      //if score==1 , reset the score
      switchPlayer();
      // document.getElementById(`current--${activePlayer}`).textContent = 0;       //this code is wrapped up in a function
      // activePlayer = activePlayer === 0 ? 1 : 0;
      // currentScore = 0;
      // player0El.classList.toggle('player--active'); //remove the white background from the active player
      // player1El.classList.toggle('player--active'); //add the white backgroun to the active player
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    //Add currents score to the active player score
    scores[activePlayer] += currentScore;
    //Display the score of the holded person
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //if score >=100, player wins the game
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', initialization);
//player2 is-> player 1 and player 1 is -> player 0
//starting a new game
// new_game.addEventListener('click', () => {
//   score1El.textContent = 0;
//   score0El.textContent = 0;
//   diceEl.classList.add('hidden');
// });
