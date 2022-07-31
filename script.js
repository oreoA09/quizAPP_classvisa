// Getting elements

// boxes

const infoBox = document.querySelector(".box")
const questionBox = document.querySelector(".questionBox")
const resultBox = document.querySelector(".resultBox")
const optionList = document.querySelector(".optionList")
const result = document.querySelector(".score")

// buttons
const startBtn = document.querySelector(".startBtn")
const exitBtn = document.querySelector(".quit")
const beginBtn = document.querySelector(".start")
const nextBtn = document.querySelector(".next")
const restartBtn = document.querySelector(".restart")
const timeCount = questionBox.querySelector(".timer .counter")
const timerText = questionBox.querySelector(".timerText")


exitBtn.onclick = () => {
	window.location.reload();
}


// Adding event lissteners
startBtn.onclick = () => {
	infoBox.classList.remove("active");
	startBtn.classList.add("active");
}

// exitBtn.onclick = () => {
// 	infoBox.classList.add("active");
// 	startBtn.classList.remove("active");
// 	resultBox.classList.add("active");
// }

beginBtn.onclick = () => {
	questionBox.classList.remove("active");
	infoBox.classList.add("active");
	startBtn.classList.add("active");
	showQuestions(count);
	startTimer(15);
}

restartBtn.onclick = () => {
	resultBox.classList.add("active");
	startBtn.classList.remove("active");

	count = 0;
	// For timing
	timeValue = 15;
	score = 0;

	showQuestions(count)
	clearInterval(countdown)
	startTimer(timeValue)

	nextBtn.style.display = "none";
	timerText.textContent = 'Time left:'
}

// Function to get questions and options from array

function showQuestions(index) {
	// for questions
	const quizText = document.querySelector(".question")
	let textTag = '<span>' + questions[index].number + '. ' + questions[index].question + '</span>'
	quizText.innerHTML = textTag;

	// for options
	let optionsTag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
		+ '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
		+ '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
		+ '<div class="option"><span>' + questions[index].options[3] + '</span></div>';

	optionList.innerHTML = optionsTag;

	// set onclick attribute to all options
	const option = optionList.querySelectorAll(".option")
	for (let i = 0; i < option.length; i++) {
		option[i].setAttribute('onclick', 'optionSelected(this)')
	}



	// for footer
	const progress = document.querySelector(".total")
	let progressTag = '<span>' + questions[index].number + ' </span><span>of</span><span> ' + questions.length + ' </span><span>Questions</span>'

	progress.innerHTML = progressTag;
}


// Next btn event listener
let count = 0;
// For timing
let countdown;
let timeValue = 15;

nextBtn.onclick = () => {
	nextBtn.style.display = "none";

	if (count < questions.length - 1) {
		count++
		showQuestions(count)
		clearInterval(countdown)
		startTimer(timeValue)
		timerText.textContent = 'Time left:'
	} else {
		clearInterval(countdown)
		showResultBox()
	}
}


// function to check answer
let score = 0;

let tick = '<i class="fa fa-check tick"></i>';
let cross = '<i class="fa fa-times cross"></i>';

function optionSelected(selected) {
	clearInterval(countdown)
	let userAns = selected.textContent;
	let correctAns = questions[count].answer;
	let allOptions = optionList.children.length;


	if (userAns === correctAns) {
		selected.classList.add("correct"); selected.insertAdjacentHTML("beforeend", tick);
		score++
	} else {
		selected.classList.add("wrong");
		selected.insertAdjacentHTML("beforeend", cross);
		score = score;
	}

	// using for loop to disable other options
	for (let i = 0; i < allOptions; i++) {
		optionList.children[i].classList.add("disabled");

		nextBtn.style.display = "block";

		if (optionList.children[i].textContent == correctAns && userAns !== correctAns) {
			optionList.children[i].setAttribute("class", "option correct");
			optionList.children[i].insertAdjacentHTML("beforeend", tick);
		}
	}
}



function startTimer(time) {
	countdown = setInterval(timer, 1000);
	function timer() {
		timeCount.textContent = time;
		time--;

		// adding zero to single digits
		if (time < 9) {
			let addZero = timeCount.textContent;
			timeCount.textContent = "0" + addZero;
		}

		// stop timer at 0
		if (time < 0) {
			clearInterval(countdown);
			timeCount.textContent = "00";
			timerText.textContent = 'Time up:'
			timerText.style.color = "red";
			timerText.style.fontWeight = "600";

			// When time is up

			let correctAns = questions[count].answer;
			let allOptions = optionList.children.length;

			for (let i = 0; i < allOptions; i++) {
				optionList.children[i].classList.add("disabled");

				nextBtn.style.display = "block";

				if (optionList.children[i].textContent == correctAns) {
					optionList.children[i].setAttribute("class", "option correct");
					optionList.children[i].insertAdjacentHTML("beforeend", tick);
				}
			}
		}
	}
}


// Showing the result box 

function showResultBox() {
	// nextBtn.textContent = "Submit";
	infoBox.classList.add("active"); questionBox.classList.add("active"); resultBox.classList.remove("active");
	result.textContent = score;
	commentry();
}

// commenting function on results
let congratText = "";
const topText = resultBox.querySelector(".scoreText");
let finalScore = resultBox.querySelector(".score").textContent;

function commentry() {
	parseInt(finalScore);

	if (finalScore < 3) {
		congratText = '<div><span> &#128542; Don\'t worry you can try again! &#128542;</span></div>';
		topText.innerHTML += congratText
	} else {
		congratText = '<div><span> &#128526; Great job! Keep learning. &#128526;</span></div>';
		topText.innerHTML += congratText
	}
}