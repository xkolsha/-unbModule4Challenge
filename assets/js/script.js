var questions = [
  {
    question: "What is the correct syntax to create an array in JavaScript?",
    choices: [
      "let array = [];",
      "let array = {};",
      "let array = ();",
      "let array = array();",
    ],
    answer: "let array = [];",
  },
  {
    question:
      "Which keyword is used to declare a variable with block scope in JavaScript?",
    choices: ["var", "let", "const", "block"],
    answer: "let",
  },
  {
    question: "What is the result of '1' + 1 in JavaScript?",
    choices: ["11", "2", "12", "NaN"],
    answer: "11",
  },
  {
    question:
      "Which method is used to add elements to the end of an array in JavaScript?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: "push()",
  },
  {
    question:
      "Which method is used to remove the last element from an array in JavaScript?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: "pop()",
  },
  {
    question: "What is the purpose of the 'this' keyword in JavaScript?",
    choices: [
      "It refers to the current function",
      "It refers to the parent object",
      "It refers to the global object",
      "It refers to the DOM element",
    ],
    answer: "It refers to the parent object",
  },
  {
    question:
      "Which operator is used to concatenate two or more strings in JavaScript?",
    choices: ["+", "-", "*", "/"],
    answer: "+",
  },
  {
    question:
      "What is the output of the following code?\n\nconsole.log(2 + '2' - 1);",
    choices: ["21", "3", "22", "NaN"],
    answer: "21",
  },
  {
    question:
      "Which method is used to convert a string to uppercase in JavaScript?",
    choices: ["toUpperCase()", "toLowerCase()", "trim()", "charAt()"],
    answer: "toUpperCase()",
  },
  {
    question: "What does the DOM stand for in JavaScript?",
    choices: [
      "Document Object Model",
      "Data Object Model",
      "Document Oriented Model",
      "Design Object Model",
    ],
    answer: "Document Object Model",
  },
];

var currentQuestion = 0;
var timeLeft = 60;
var timer;
var choicesContainer = document.querySelector("#choices-container");
var questionContainer = document.querySelector("#question-container");
var startButton = document.querySelector("#start-button");

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.style.display = "none";
  document.querySelector("#subtitle-hero").style.display = "none";
  timer = setInterval(updateTime, 1000);
  updateTime();
  nextQuestion();
}

function updateTime() {
  timeLeft--;
  document.querySelector("#timer").textContent = `Time: ${timeLeft}s`;

  if (timeLeft <= 0) {
    endQuiz();
  }
}

function nextQuestion() {
  if (currentQuestion < questions.length) {
    questionContainer.textContent = questions[currentQuestion].question;
    choicesContainer.innerHTML = "";

    for (var i = 0; i < questions[currentQuestion].choices.length; i++) {
      var choiceButton = document.createElement("answer-button");
      choiceButton.classList.add(
        "button",
        "is-dark",
        "is-medium",
        "mr-3",
        "mb-3"
      );
      choiceButton.textContent = questions[currentQuestion].choices[i];
      choiceButton.setAttribute(
        "answer-choice",
        questions[currentQuestion].choices[i]
      );
      choicesContainer.appendChild(choiceButton);
      choiceButton.addEventListener("click", checkAnswer);
    }
  } else {
    endQuiz();
  }
}

function checkAnswer(event) {
  var selectedChoice = event.target.getAttribute("answer-choice");

  if (selectedChoice === questions[currentQuestion].answer) {
    currentQuestion++;
    nextQuestion();
  } else {
    timeLeft -= 10;
  }
}

function endQuiz() {
  clearInterval(timer);
  var Name = prompt("Enter your Name:");
  var score = timeLeft;
  localStorage.setItem("Name", Name);
  localStorage.setItem("score", score);
  questionContainer.textContent = `Your score is: ${score}`;
  questionContainer.classList.add("is-size-3");
  choicesContainer.innerHTML = "";
  var resetButton = document.createElement("button");
  resetButton.classList.add("button", "is-danger", "is-large", "mr-3", "mb-3");
  resetButton.textContent = "Reset Quiz";
  resetButton.addEventListener("click", resetQuiz);
  choicesContainer.appendChild(resetButton);
}

function resetQuiz() {
  currentQuestion = 0;
  timeLeft = 60;
  startButton.style.display = "block";
  document.querySelector("#subtitle-hero").style.display = "block";
  questionContainer.textContent = "";
}
