const quizzes = {
  python: [
    { question: "What is the keyword to define a function in Python?", answers: ["func", "def", "function", "define"], correct: 1 },
    { question: "Which of these is a Python data structure?", answers: ["Array", "List", "Tree", "Graph"], correct: 1 },
    { question: "How do you create a variable in Python?", answers: ["let x = 5", "var x = 5", "x = 5", "int x = 5"], correct: 2 },
    { question: "What does 'len()' function do?", answers: ["Calculates length", "Finds max value", "Finds min value", "Reverses a list"], correct: 0 },
    { question: "How do you start a comment in Python?", answers: ["//", "/*", "#", "<!--"], correct: 2 }
  ],
  html: [
    { question: "What does HTML stand for?", answers: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Marking Language"], correct: 0 },
    { question: "Who is making the Web standards?", answers: ["Mozilla", "Microsoft", "The World Wide Web Consortium", "Google"], correct: 2 },
    { question: "Choose the correct HTML element for the largest heading:", answers: ["<heading>", "<h6>", "<head>", "<h1>"], correct: 3 },
    { question: "What is the correct HTML element for inserting a line break?", answers: ["<lb>", "<br>", "<break>", "<newline>"], correct: 1 },
    { question: "What is the correct HTML for adding a background color?", answers: ["<body bg='yellow'>", "<background>yellow</background>", "<body style='background-color:yellow;'>", "<body style='bg:yellow;'>"], correct: 2 }
  ],
  javascript: [
    { question: "Inside which HTML element do we put the JavaScript?", answers: ["<js>", "<script>", "<javascript>", "<scripting>"], correct: 1 },
    { question: "Where is the correct place to insert a JavaScript?", answers: ["The <head> section", "Both the <head> section and the <body> section are correct", "The <body> section", "None of the above"], correct: 1 },
    { question: "What is the correct syntax for referring to an external script called 'xxx.js'?", answers: ["<script name='xxx.js'>", "<script href='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"], correct: 2 },
    { question: "How do you write 'Hello World' in an alert box?", answers: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"], correct: 3 },
    { question: "How do you create a function in JavaScript?", answers: ["function = myFunction()", "function:myFunction()", "function myFunction()", "function => myFunction()"], correct: 2 }
  ]
};

let currentQuiz = [];
let currentQuestionIndex = 0;
let score = 0;

// ... (keep your existing quizzes object and other variables) ...

function goToQuiz() {
  animateBackgroundColor('#E0F7FA');
  document.getElementById('home-container').classList.add('hidden');
  document.getElementById('quiz-container').classList.remove('hidden');
}

function startQuiz(topic) {
  currentQuiz = quizzes[topic];
  currentQuestionIndex = 0;
  score = 0;
  animateBackgroundColor(getBackgroundColor(topic));
  document.getElementById('quiz-selection').classList.add('hidden');
  document.getElementById('quiz').classList.remove('hidden');
  document.getElementById('quiz-title').textContent = `${topic.charAt(0).toUpperCase() + topic.slice(1)} Quiz`;
  showQuestion();
  updateProgressBar();
}

function getBackgroundColor(topic) {
  switch(topic) {
      case 'python': return '#FFEBEE';
      case 'html': return '#E8F5E9';
      case 'javascript': return '#FFFDE7';
      default: return '#FFFFFF';
  }
}

function animateBackgroundColor(color) {
  document.body.style.backgroundColor = color;
}

function showQuestion() {
  const questionContainer = document.getElementById('question-container');
  questionContainer.innerHTML = '';
  const question = currentQuiz[currentQuestionIndex];
  const questionElement = document.createElement('div');
  questionElement.textContent = question.question;
  questionContainer.appendChild(questionElement);
  question.answers.forEach((answer, index) => {
      const button = document.createElement('button');
      button.textContent = answer;
      button.onclick = () => selectAnswer(index, button);
      questionContainer.appendChild(button);
  });
}

function selectAnswer(index, button) {
  document.querySelectorAll('#question-container button').forEach(btn => {
      btn.disabled = true;
      btn.classList.remove('correct', 'wrong');
  });

  if (index === currentQuiz[currentQuestionIndex].correct) {
      score++;
      button.classList.add('correct');
  } else {
      button.classList.add('wrong');
      const correctButton = document.querySelectorAll('#question-container button')[currentQuiz[currentQuestionIndex].correct];
      correctButton.classList.add('correct');
  }

  setTimeout(() => {
      if (currentQuestionIndex < currentQuiz.length - 1) {
          currentQuestionIndex++;
          showQuestion();
          updateProgressBar();
      } else {
          showResult();
      }
  }, 1500);
}

function showResult() {
  document.getElementById('question-container').classList.add('hidden');
  document.getElementById('result').classList.remove('hidden');
  document.getElementById('score').textContent = `${score} out of ${currentQuiz.length}`;
  
  if (score === currentQuiz.length) {
      document.getElementById('congrats-message').classList.remove('hidden');
      document.getElementById('try-again').classList.add('hidden');
  } else {
      document.getElementById('congrats-message').classList.add('hidden');
      document.getElementById('try-again').classList.remove('hidden');
  }
}

function tryAgain() {
  currentQuestionIndex = 0;
  score = 0;
  document.getElementById('result').classList.add('hidden');
  document.getElementById('question-container').classList.remove('hidden');
  showQuestion();
  updateProgressBar();
}

function updateProgressBar() {
  const progressPercentage = ((currentQuestionIndex + 1) / currentQuiz.length) * 100;
  const progressBar = document.getElementById('progress-bar');
  progressBar.style.width = `${progressPercentage}%`;
}
