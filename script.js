// Данные викторины, распределенные по уровням сложности
const quizData = {
    easy: [
        { question: "What is the capital of the United States?", options: ["New York", "Washington, D.C.", "Los Angeles", "Chicago"], correct: 1 },
        { question: "Which number is the smallest prime number?", options: ["1", "5", "3", "2"], correct: 3 },
        { question: "What color is a banana?", options: ["Yellow", "Green", "Red", "Purple"], correct: 0 },
        { question: "How many sides does a triangle have?", options: ["2", "3", "4", "5"], correct: 1 },
        { question: "What is 10 divided by 2?", options: ["2", "3", "5", "10"], correct: 2 }
    ],
    medium: [
        { question: "What year did the Titanic sink?", options: ["1905", "1915", "1920", "1912"], correct: 3 },
        { question: "Which country is known as the Land of the Rising Sun?", options: ["Japan", "China", "South Korea", "Thailand"], correct: 0 },
        { question: "What is the highest mountain in the world?", options: ["K2", "Mount Everest", "Kangchenjunga", "Makalu"], correct: 1 },
        { question: "Who holds the record for the most Formula 1 World Championship titles?", options: ["Max Verstappen", "Lando Norris", "Michael Schumacher", "Charles Leclerc"], correct: 2 },
        { question: "Which continent is the Sahara Desert located on?", options: ["Asia", "Africa", "South America", "Australia"], correct: 1 }
    ],
    hard: [
        { question: "What year did humans first land on the moon?", options: ["1965", "1969", "1972", "1975"], correct: 1 },
        { question: "Which country has won the most FIFA World Cups?", options: ["Germany", "Italy", "Brazil", "Argentina"], correct: 2 },
        { question: "What is the fastest land animal?", options: ["Cheetah", "Lion", "Horse", "Greyhound"], correct: 0 },
        { question: `Which novel begins with the line, "It was the best of times, it was the worst of times"?`, options: ["Pride and Prejudice", "Moby-Dick", "Great Expectations", "A Tale of Two Cities"], correct: 3 },
        { question: "What is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], correct: 1 }
    ]
};

// DOM-элементы для разных разделов игры и кнопок управления
const mainMenu = document.getElementById("main-menu");
const levelSelection = document.getElementById("level-selection");
const quizContainer = document.getElementById("quiz-container");
const quizElement = document.getElementById("quiz");
const scoreContainer = document.getElementById("score");
const nextButton = document.getElementById("next");
const mainMenuButton = document.getElementById("main-menu-btn");
const returnMenuButton = document.getElementById("return-menu");

// Переменные для текущего состояния игры
let currentLevel = "";
let username = "";
let currentQuestionIndex = 0;
let score = 0;

// Обработчик события для кнопки "Start"
document.getElementById("start-button").addEventListener("click", () => {
    mainMenu.classList.add("d-none");
    levelSelection.classList.remove("d-none");
});

//Next button
function handleNextButton(){
	currentQuestionIndex ++;
	if (currentQuestionIndex < questions.length) {
		showQuestion();
	} else {
		showScore();
	}
}

nextButton.addEventListener("click", () => {
	if (currentQuestionIndex < questions.length) {
		handleNextButton();
	} else {
		startQuiz();
	}
});

// Обработчики кнопок уровней сложности
document.querySelectorAll(".level-btn").forEach(button => {
    button.addEventListener("click", (e) => {
        currentLevel = e.target.dataset.level;
        username = document.getElementById("username").value.trim();
        if (!username) {
            alert("Please enter your name.");
            return;
        }
        levelSelection.classList.add("d-none");
        quizContainer.classList.remove("d-none");
        loadQuiz();
    });
});

// Функция загрузки текущего вопроса викторины
function loadQuiz() {
    const currentQuizData = quizData[currentLevel][currentQuestionIndex];
    quizElement.innerHTML = `
        <div class="question fs-4 fw-bolder" >${currentQuizData.question}</div>
        ${currentQuizData.options.map((option, index) => 
            `<div class="form-check alert alert-primary">
                <input class="form-check-input " type="radio" name="answer" id="option${index}" value="${index}">
                <label class="form-check-label" for="option${index}">${option}</label>
            </div>`
        ).join('')}
    `;
}

// Функция получения выбранного ответа
function getSelected() {
    const answers = document.getElementsByName("answer");
    let selectedAnswer = -1;
    answers.forEach((answer, index) => {
        if (answer.checked) {
            selectedAnswer = index;
        }
    });
    return selectedAnswer;
}

// Обработчик кнопки "Submit"
submitButton.addEventListener("click", () => {
    const selectedAnswer = getSelected();
    if (selectedAnswer === -1) {
        alert("Please select an answer!");
        return;
    }

    if (selectedAnswer === quizData[currentLevel][currentQuestionIndex].correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < quizData[currentLevel].length) {
        loadQuiz();
    } else {
        quizElement.innerHTML = "<h3 class='text-center'>Quiz Completed!</h3>";
        scoreContainer.textContent = `${username}, your score: ${score}/${quizData[currentLevel].length}`;
        
        submitButton.style.display = "none";
        mainMenuButton.classList.remove("d-none");
    }
});

// Main Menu Button Event
mainMenuButton.addEventListener("click", () => {
    score = 0;
    currentQuestionIndex = 0;
    currentLevel = "";
    username = "";
    document.getElementById("username").value = "";
    quizContainer.classList.add("d-none");
    levelSelection.classList.add("d-none");
    mainMenu.classList.remove("d-none");
    mainMenuButton.classList.add("d-none");
    submitButton.style.display = "block";
    scoreContainer.textContent = "";
});

// Return to Level Selection Button Event
returnMenuButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.textContent = "";
    submitButton.style.display = "block";
    mainMenuButton.classList.add("d-none");
    levelSelection.classList.remove("d-none");
    quizContainer.classList.add("d-none");
});