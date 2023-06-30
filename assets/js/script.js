/// Change header, list, and countdown elements after clicking button
let mainEl = document.getElementById('main');
let navEl = document.getElementById('nav');
let scoreEl = document.getElementById('score');
let timerEl = document.getElementById('timer');
let containerEl = document.querySelector(".flex-container");
let headerEl = document.getElementById('header');
let listEl = document.getElementById('list');
let answerEl = document.getElementById('answer');
let buttonEl = document.getElementById("start");
let liEl = document.querySelectorAll("li");

// Array that contains all possible questions
let question = ["1+1?",
              "How many fingers on a hand?",
              "How many eyes on a face?",
              "How many stars in the US flag?",
              "What is the square root of 1?"];

// Array of arrays that contain all possible answers
let answer = [[1,2,3,4],
              [2,3,4,5],
              [2,4,6,8],
              [20,30,40,50],
              [1,9,8,7]];

// Array of correct answers
let correctAnswer = [2, 5, 2, 50, 1];

// Score variable to be stored later
let score = 0;

// Global time variable
let timeLeft = 60;

// High Score Variables
let highScores = [];
let storedHighScores = JSON.parse(localStorage.getItem("highScores"))

// This function is being called below and will run when the page loads.
function init() {
  // Get stored todos from localStorage
  console.log(storedHighScores);
  // If todos were retrieved from localStorage, update the todos array to it
  if (storedHighScores !== null) {
    highScores = storedHighScores;
  }

}

// Countdown function to run every 1000 milliseconds
function countdown() {

  let timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if(timeLeft < 1) {
      // Stops execution of action at set interval
      timeLeft = 0;
      clearInterval(timeInterval);
      timerEl.textContent = "DONE";
      gameOver();
    } 
  }, 1000);
}

// Event Listener that starts function when clicked
buttonEl.addEventListener("click", quizStart);

// Quiz start will start countdown, populate a question, then populate choices
function quizStart() {
  countdown();
  containerEl.removeChild(start);
  populateQuestion();
  populateChoices();
}

// Replaces Header Element text content
function populateQuestion() {
  headerEl.textContent = question[0];
  if (answer.length === 0) {
    gameOver();
  }
}

function removeButtons() {
  let element = document.querySelectorAll("li");
  for (var i = 0; i < 4; i++) {
    if (element[i].firstChild) {
      element[i].removeChild(element[i].firstChild);
    }
  }
}

function populateChoices() {
  removeButtons();
  for (var i = 0; i < 4; i++) {
    let choiceEl = document.createElement("button");
    choiceEl.textContent = answer[0][i];
    liEl[i].appendChild(choiceEl);
    choiceEl.addEventListener("click", function(event) {
      buttonText = event.target.textContent;
      nextQuestion();
    });
  }
}

function nextQuestion() {
  if (buttonText == correctAnswer[0]) {
    score = score + 5;
  } else {
    score = score - 5;
    timeLeft = timeLeft - 10;
  }
  if (question.length !== 0) {
    question.shift();
    answer.shift();
    correctAnswer.shift();
    populateQuestion();
    populateChoices();  
  } else {
    removeButtons();
    headerEl.textContent = "GAME OVER!"
  }
}

function gameOver() {
  headerEl.textContent = "GAME OVER"
  score = score + timeLeft;
  listEl.textContent = "Submit your score to finish the quiz! Your Score is: " + score;
  timeLeft = 0;
  createForm();
}

function createForm() {
  let scoreForm = document.createElement("form");
  scoreForm.setAttribute("id", "myForm");
  listEl.appendChild(scoreForm);

  let userInput = document.createElement("input");
  userInput.setAttribute("id", "myInput");
  document.getElementById("myForm").appendChild(userInput);

  let submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  document.getElementById("myForm").appendChild(submitButton);
  scoreForm.addEventListener("submit", function(event){
    event.preventDefault()
    saveHighScore(document.getElementById("myInput").value, score);
  });
    // set new submission to local storage
  };

  function saveHighScore(name, score) {
    const newScore = { name, score };
    console.log(newScore);
    highScores.push(newScore);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  };

// Event Listener that populates the scoreboard
scoreEl.addEventListener("click", function() {
  if (!timeEnd()) {
    alert("Finish the quiz first! You got this!");
  } else {
    containerEl.removeChild(start);
    removeButtons();
    headerEl.textContent = "High Scores";
    for (let i = 0; i < 5; i++) {
      listEl.children[i].textContent = storedHighScores[i].name + "     - - -     " + storedHighScores[i].score;
    }
  }
});

function timeEnd() {
  if (timeLeft !== 60) {
    return false;
  } else {
    return true;
  }
}
console.log(listEl.childElementCount);
init();