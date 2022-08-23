var quizButtonEl = document.getElementById("start-quiz")
var viewScore =document.getElementById("view-score")
var quizContainer = document.getElementById("quiz-question")
var quizBody= document.getElementById("quiz-body")
var timer = document.getElementById("timer")
var timeStart = document.getElementById("time-left")
var timeLeft=100
var confirmAnswer = document.getElementById("check-answer")
var questionCount = 0
var highScores = JSON.parse(localStorage.getItem("scores") || '[]')
var quizQuestions = [
    {
        question: "what is 2+2",
        answers: [ 
            "4", "6", "7", "8",
        ],
        correct: "4"
    },
    {
        question: "what is 3+3",
        answers: ["4", "7", "6", "8",
        ],
        correct: "6"
    },
    {
        question: "what is 4+4",
        answers: ["4", "7", "6","8"
        ],
        correct:"4"
    },
    {
        question: "what is 5+5",
        answers: ["10", "7", "6","8"
        ],
        correct:"10"
    },
    {
        question: "what is 6+6",
        answers: ["4", "7", "12","8"
        ],
        correct:"12"
    }
]
//starts the timer and begins generate question function

function timerCount(){       
    timeLeft --
    timeStart.innerHTML= timeLeft                 

}

var beginQuiz = function(){
    quizContainer.innerHTML=""
    var timerStart= setInterval(timerCount, 1000);
       
    if (timeLeft===0){
        clearInterval(timerStart);
        endQuiz(timeLeft);
    }

    generateQuestions(questionCount);

}

var generateQuestions = function(count) {

                       
        quizButtonEl.remove();

        var question = document.createElement("h1")
        question.innerText=(quizQuestions[count].question)
        quizContainer.appendChild(question)
                
        for (i=0; i<quizQuestions.length-1; i++){
        var answerList = document.createElement("div")
        answerList.classList=("answerBtn")
        var answerChoice = quizQuestions[count].answers[i] 
                
        answerList.innerText =  answerChoice
        quizContainer.appendChild(answerList)
        

            
                                                
    }

}

var checkAnswer = function (event){
        if(event.target.matches(".answerBtn")){
            if(event.target.innerHTML === quizQuestions[questionCount].correct){
                confirmAnswer.innerHTML="correct!"
            }
            else{
                confirmAnswer.innerHTML="wrong!"    
                timeLeft=timeLeft-15
            }

            if(questionCount < quizQuestions.length-1){
                questionCount ++
                quizContainer.innerHTML=""
                generateQuestions(questionCount)
            }
            else {
                endQuiz(timeLeft);
                console.log(timeLeft)
            } 
        }

}

var submitScore = function(score, initials) {

    highScores.push(initials + ":" + score)
    localStorage.setItem("scores", JSON.stringify(highScores));
    displayHighScore();

       
}

var displayHighScore = function() {

    quizContainer.innerHTML= " "
    
    var quizHighScores = document.createElement("div")
    quizHighScores.innerHTML = "<h1>High Scores</h1>"

    // var clearHighScores = document.createElement("div")
    // clearHighScores.innerHTML = "<button class ='clearHighScores' id='clear-score' type='click'>Clear HighScores</button><input class = 'retakeQuiz' type='button' onclick='location.href=.'/index.html'' value='Retake Quiz!' >"


    var highScoreList = document.createElement("ol")

    for (i=0; i< highScores.length; i++) {
        var individualScores=  document.createElement("li")
        individualScores.innerText = highScores[i]
        highScoreList.appendChild(individualScores)
    }
    quizHighScores.appendChild(highScoreList)
    quizContainer.appendChild(quizHighScores)
    // quizBody.appendChild(clearHighScores)



}
var clearHighScore = function(){
    localStorage.clear("highScores")
}



var endQuiz = function(score){
    
    quizContainer.innerHTML="Quiz is over! Your final score is: " + score + "! <br><br> Enter your Initials to save your high score!"
    confirmAnswer.innerHTML=""

    var initialForm = document.createElement("form")
    initialForm.className=("initialForm")
    var enterInitials = document.createElement("div")
    enterInitials.innerHTML = "<input type='text' id='initials' placeholder='Enter Your Initials'>"
    var initialsButton = document.createElement("div")
    initialsButton.innerHTML = "<button class='submitInitials' id='submit-initials' type='click'>Submit</button>"

    initialForm.appendChild(enterInitials)
    initialForm.appendChild(initialsButton)

    quizBody.appendChild(initialForm)

    quizBody.addEventListener ("click", function(event) {
        event.preventDefault();
        if (event.target.matches(".submitInitials")){
        var initialsInput = document.getElementById("initials")
        var initials= initialsInput.value.trim()

        if (initials){
        submitScore(score, initials);
        }
        else{
            alert("Please Enter Your  Initials")
        }
        
        }
    })

    timer.innerHTML=" "
}


quizBody.addEventListener ("click",clearHighScore)

quizContainer.addEventListener("click", checkAnswer)
//begin quiz when button is clicked
quizButtonEl.addEventListener("click", beginQuiz)

viewScore.addEventListener("click", displayHighScore)















