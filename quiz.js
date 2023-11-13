const url = 'https://script.google.com/macros/s/AKfycbxPdNTt_3hJ-8JTBS4qz9QFqcb0FTgdXrjvNWSVunm_Qalj1v36ZcDpLBC7BvO1pgrE/exec'
//URL for web service


const questionTest = [
  {
    question: "Who was the Steelers' original founder?",
    options: ["Art Rooney", "Dan Rooney", "Chuck Noll", "Bill Cowher"],
    answer: "Art Rooney",
  },
];
const questionLive = [
  {
    question: "What year was the Pittsburgh Steelers founded?",
    options: ["1933", "1945", "1950", "1960"],
    answer: "1933",
  },
  {
    question: "How many head coaches have the Steelers had since 1969?",
    options: ["3", "2", "6", "17"],
    answer: "3",
  },
  {
    question: 'Which former Steelers player was known as "The Bus"?',
    options: [
      "Kordell Stewart",
      "Ben Roethlisberger",
      "Jerome Bettis",
      "Hines Ward",
    ],
    answer: "Jerome Bettis",
  },
  {
    question:
      "Who did the Steelers defeat in their most recent Super Bowl victory?",
    options: ["Buccaneers", "Seahawks", "Cardinals", "Packers"],
    answer: "Cardinals",
  },
  {
    question: "What was the original name of the Pittsburgh Steelers?",
    options: ["Pirates", "Steagles", "Condors", "Passion"],
    answer: "Pirates",
  },
  {
    question: "How many Super Bowls have the Steelers won?",
    options: ["33", "6", "7", "5"],
    answer: "6",
  },
  {
    question:
      "Name the Steelers defensive player who won the NFL Defensive Player of the Year Award in 2020",
    options: [
      "Mean Joe Green",
      "Casey Hampton",
      "TJ Watt",
      "Coach Cahrr",
    ],
    answer: "TJ Watt",
  },
  {
    question:
      "The Steelers and which other NFL team are tied for the most Super Bowl titles?",
    options: ["Packers", "Bears", "Patriots", "Coach Cahrr"],
    answer: "Patriots",
  },
  {
    question:
      "Which Steeler has been the MVP in more than one Super Bowl?",
    options: [
      "Ben Roethlisberger",
      "Franco Harris",
      "Terry Bradshaw",
      "Hines Ward",
    ],
    answer: "Terry Bradshaw",
  },
  {
    question:
      "The Pittsburgh Steelers have always played in the AFC North division.",
    options: ["True", "False"],
    answer: "False",
  },
  // ... Add more questions in the same format
];

const questions = questionTest;
let currentQuestionIndex = 0;
let score = 0;
let userName = "";
let incorrectAnswers = [];

function startGame() {
  userName = document.getElementById("nameInput").value;
  document.getElementById("nameInput").parentNode.style.display = "none";
  document.getElementById("12").style.display = "none";
  showQuestion();
}

function showQuestion() {
  const questionObj = questions[currentQuestionIndex];
  let quizHtml = `<div class="mb-3"><h4>${questionObj.question}</h4></div>`;

  questionObj.options.forEach((option) => {
    quizHtml += `<button class="btn btn-primary btn-block mb-2" onclick="chooseOption('${option}')">${option}</button>`;
  });

  document.getElementById("quiz").innerHTML = quizHtml;
}

function chooseOption(selected) {
  const correct = questions[currentQuestionIndex].answer;
  if (selected !== correct) {
    incorrectAnswers.push({
      question: questions[currentQuestionIndex].question,
      correct,
    });
  } else {
    score++;
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    clearInterval(timerInterval);
    let resultsHtml = `<h2 class="text-center">Game Over, ${userName}!</h2>
<h2 class="text-center">Your score is: ${score}</h2>`;

    if (incorrectAnswers.length > 0) {
      resultsHtml += `<div class="mt-4 mb-4 text-center"><h3>Shame on you! You got these questions wrong:</h3><ul class="list-group">`;
      incorrectAnswers.forEach((item) => {
        resultsHtml += `<li class="list-group-item list-group-item-warning">${item.question}<br><small>Correct answer: ${item.correct}</small></li>`;
      });
      resultsHtml += `</ul></div>`;
    }

    //   resultsHtml += `<button class="btn btn-primary btn-block" onclick="location.reload()">Play Again</button>`;
    document.getElementById("quiz").innerHTML = resultsHtml;
    postScore(userName, score)
    getLeaderboard()
  }
}

let timerInterval;

function startTimer(duration, display) {
  let timer = duration,
    minutes,
    seconds;
  timerInterval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      timer = duration;
    }

    if (timer === 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);
}

function endQuiz() {
console.log('EndQuiz');
  clearInterval(timerInterval);
  document.getElementById("quiz").innerHTML =
    `<h2 class="text-center">Time's up, ${userName}!</h2>` +
    document.getElementById("quiz").innerHTML;
  let resultsHtml = `<h2 class="text-center">Game Over, ${userName}!</h2>
<h2 class="text-center">Your score is: ${score}</h2>`;

  if (incorrectAnswers.length > 0) {
    resultsHtml += `<div class="mt-4 mb-4 text-center"><h3>Shame on you! You got these questions wrong:</h3><ul class="list-group">`;
    incorrectAnswers.forEach((item) => {
      resultsHtml += `<li class="list-group-item list-group-item-warning">${item.question}<br><small>Correct answer: ${item.correct}</small></li>`;
    });
    resultsHtml += `</ul></div>`;
  }

  //   resultsHtml += `<button class="btn btn-primary btn-block" onclick="location.reload()">Play Again</button>`;
  document.getElementById("quiz").innerHTML = resultsHtml;
  postScore(userName, score)
  getLeaderboard()
}

function startGame() {
  userName = document.getElementById("nameInput").value;
  document.getElementById("nameInput").parentNode.style.display = "none";
  document.getElementById("12").style.display = "none";
  // Start the timer with 3 minutes (3 * 60 seconds)
  startTimer(5, document.querySelector("#timer"));
  showQuestion();
}


function postScore(name, score) {
  console.log('Posting score')
    const data = { name: name, score: score };

    fetch(url, {
        method: 'POST',
        contentType: 'application/json',
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function getLeaderboard() {
  const url = 'https://script.google.com/macros/s/AKfycbxPdNTt_3hJ-8JTBS4qz9QFqcb0FTgdXrjvNWSVunm_Qalj1v36ZcDpLBC7BvO1pgrE/exec'
    console.log('Getting leaderboard data');
    fetch(url, {
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
      console.log(data)
        displayLeaderboard(data); // Function to handle the display of leaderboard data
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function displayLeaderboard(data) {
  console.log('Displaying leaderboard data')
  const leaderboardBody = document.getElementById('leaderboard-entries');
  leaderboardBody.innerHTML = ''; // Clear existing leaderboard entries

  data.forEach((entry, index) => {
      const row = `<tr>
                      <td>${index + 1}</td>
                      <td>${entry.name}</td>
                      <td>${entry.score}</td>
                   </tr>`;
      leaderboardBody.innerHTML += row;
  });

  document.getElementById('leaderboard').style.display = 'block'; // Show the leaderboard
}


