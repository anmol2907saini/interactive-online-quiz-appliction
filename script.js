const questions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Rome", correct: false },
      { text: "Madrid", correct: false }
    ]
  },
  {
    question: "Which language runs in a web browser?",
    answers: [
      { text: "Java", correct: false },
      { text: "C", correct: false },
      { text: "Python", correct: false },
      { text: "JavaScript", correct: true }
    ]
  },
  {
    question: "Who is the founder of Microsoft?",
    answers: [
      { text: "Steve Jobs", correct: false },
      { text: "Bill Gates", correct: true },
      { text: "Elon Musk", correct: false },
      { text: "Mark Zuckerberg", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    button.addEventListener("click", () => selectAnswer(button, answer.correct));
    answerButtons.appendChild(button);
  });
}

function resetState() {
  nextButton.style.display = "none";
  answerButtons.innerHTML = "";
}

function selectAnswer(button, correct) {
  const buttons = answerButtons.children;
  for (let btn of buttons) {
    btn.disabled = true;
  }

  if (correct) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("incorrect");
  }

  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
});

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
  nextButton.onclick = startQuiz;
}

startQuiz();
