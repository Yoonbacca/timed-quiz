// Change header, list, and countdown elements after clicking button
let mainEl = document.getElementById('main');
let navEl = document.getElementById('nav');
let scoreEl = document.getElementById('score');
let timerEl = document.getElementById('timer');
let containerEl = document.querySelector(".flex-container");
let headerEl = document.getElementById('header');
let answerEl = document.getElementById('answer');
let buttonEl = document.getElementById("start");

// Array that contains all possible questions
let question = ["One plus one?",
"How many fingers on a hand?",
"How many eyes on a face?",
"How many stars in the US flag?",
"What is the square root of 1?"];

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

function quizStart() {
    countdown();
    headerEl.textContent = headerOne;
}