const gameContainer = document.getElementById('game');

const cards = gameContainer.children;

const scoreBoard = document.querySelector('.score');

const pb = document.querySelector('.pb');

let score = 0;

let COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

let selections = {};

// Populate personal best if one exists
function setPb() {

  if (localStorage.highScore === undefined) {
    pb.innerText = ``;
  } else {
    pb.innerText = `Personal Best: ${localStorage.highScore}`;
  }
}

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;
  console.log(array.length);
  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  let i = 0;

  for (let color of colorArray) {
    i++;
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    // give id to ensure same card doesn't count as a match
    newDiv.id = i;
    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// Game Start
const startButton = document.querySelector('button.start');

startButton.addEventListener('click', function(){
  setPb();
  createDivsForColors(shuffledColors);
})

// Game Reset
const resetButton = document.querySelector('button.reset');

resetButton.addEventListener('click', function(){
  location.reload();
})

// Selecting cards
function handleCardClick(event) {
  score ++;
  scoreBoard.innerText = score;

  if (Object.keys(selections).length < 1) {
    event.target.classList.add('flipped');
    selections[event.target.id] = event.target.classList[0];
  } else if (Object.keys(selections).length < 2) {
    event.target.classList.add('flipped');
    selections[event.target.id] = event.target.classList[0];
    setTimeout(function() {
      isMatch(selections);
    }, 1000);
  } else {
    alert('Slow down tiger, only two cards at a time!');
    selections = {};
  }
}

// check if selections are a match
function isMatch(obj) {
  const selected = document.querySelectorAll('div.flipped');

  if (Object.keys(obj).length <= 1) {
    for (let cards of selected) {
      cards.classList.toggle('flipped');
    }
    alert("You can't select the same card twice, that's cheating!");
    selections = {};
  } 
    else if (Object.values(obj)[0] == Object.values(obj)[1]) {
      for (let cards of selected) {
        cards.classList.toggle('matched');
        cards.classList.toggle('flipped');
        setTimeout(function() {
          gameOver();
        }, 500);
      }
      selections = {};
    } else {
      for (let cards of selected) {
        cards.classList.toggle('flipped');
      }
      selections = {};
    }
}

// Game end
function gameOver() {
  
  for (let i = 0; i < COLORS.length; i++) {
    if (cards[i].classList[1] == 'matched') {
      continue;
    } else {
      return false;
    }
  }
    if (localStorage.highScore === undefined) {
      localStorage.setItem('highScore', score);
    }  

    if (score <= localStorage.highScore) {
      localStorage.setItem('highScore', score);
      pb.innerText = `Personal Best: ${score}`;
      alert(`Congratulations, you win! Your new personal best is ${score}!`);
      location.reload();
    } else if (score > localStorage.highScore) {
      alert(`Congratulations, you win! Sadly you did not manage to beat your personal best of ${localStorage.highScore}.`);
      location.reload();
    }
}

