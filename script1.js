document.addEventListener('DOMContentLoaded', (event) => {
    const questions = Array.from(document.querySelectorAll('.question'));
    var answers = Array.from(document.querySelectorAll('.answer'));

    questions.forEach(question => {
        question.addEventListener('dragstart', handleDragStart);
    });

    answers.forEach(answer => {
        answer.addEventListener('dragover', handleDragOver);
        answer.addEventListener('drop', handleDrop);
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', this.innerText);
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    }

    function handleDrop(e) {
        e.preventDefault();
        const questionText = e.dataTransfer.getData('text/plain');
        const answerBox = this;
        e.dataTransfer.clearData();
        checkAnswer(questionText, answerBox);
    }

    function checkAnswer(question, answerBox) {
        const correctAnswers = {
            '3+4': '7',
            '7-6': '1',
            '2+3': '5',
            '9-3': '6'
        };
    
        const expectedAnswer = eval(question);
        const userAnswer = answerBox.innerText;
    
        if (userAnswer == correctAnswers[question]) {
            answerBox.innerText = `${question} = ${userAnswer}`;
            answerBox.classList.add('correct');
            const questionElement = document.querySelector(`.question[data-original="${question}"]`);
            if (questionElement) {
                questionElement.remove();
            }
            checkWinCondition();
        } else {
            const previousText = answerBox.innerText;
            answerBox.innerText = 'Vale! Proovi uuesti!';
            answerBox.classList.add('wrong');
            setTimeout(() => {
                answerBox.innerText = previousText;
                answerBox.classList.remove('wrong');
            }, 1000);
        }
    }

    questions.forEach(question => {
        question.setAttribute('data-original', question.innerText);
    });

    let timeLeft = 60;
const timerElement = document.getElementById('timer');

const countdown = setInterval(() => {
  timeLeft--;
  timerElement.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(countdown);
    timerElement.textContent = 'Aeg on otsas!';
    if (confirm('Aeg on otsas!')) {
      location.reload();
    }
  }
}, 1000);

function checkWinCondition() {
    answers = document.querySelectorAll('.answer.correct');
    const allQuestionsAnswered = answers.length === 4;
  
    if (allQuestionsAnswered) {
      clearInterval(countdown);
      timerElement.textContent = 'Sa v\u00F5itsid!';
      alert('Sa v\u00F5itsid!');
        var nextPageUrl = "dragndrop2.html";

        var delay = 230;

        setTimeout(function() {
    window.location.href = nextPageUrl;
        }, delay);
    }
  }
});