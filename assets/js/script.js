// Change header, list, and countdown elements after clicking button
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

// Countdown function to run every 1000 milliseconds
function countdown() {
  let timeLeft = 60;
  let timeInterval = setInterval(function () {
    timeLeft--;
    timerEl.textContent = "Time: " + timeLeft;

    if(timeLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timeInterval);
      timerEl.textContent = "DONE";
      // Calls function to create and append image
    } 
  }, 1000);
}

//Event Listener that starts function when clicked
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
}

function removeButtons() {
  let element = document.querySelectorAll("li");
  for (var i = 0; i < answer[0].length; i++) {
    if (element[i].firstChild) {
      element[i].removeChild(element[i].firstChild);
    }
  }
}

function populateChoices() {
  removeButtons();
  for (var i = 0; i < answer[0].length; i++) {
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
    score++;
  } 
  if (question.length !== 0) {
    question.shift();
    answer.shift();
    correctAnswer.shift();
    populateQuestion();
    populateChoices();  
    console.log(answer)
  } else {
    removeButtons();
  }
}