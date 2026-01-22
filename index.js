
const quizQuestions = [
    {
      question: "What is the capital of India ?",
      options: ["Delhi", "Lucknow", "Kashi", "Mumbai"],
      answer: "Delhi"
    },
    {
      question: "Which is the largest planet?",
      options: ["Earth", "Jupiter", "Mars", "Venus"],
      answer: "Jupiter"
    },
    {
      question: "What language runs in a web browser?",
      options: ["Java", "C", "Python", "JavaScript"],
      answer: "JavaScript"
    },
    {
      question: "Which language is used not in frontend?",
      options: ["Redux", "Java", "HTML" ,"TypeScript"],
      answer: "Java"
    },
    {
      question: "Which is not part of India ",
      options: ["Punjab", 'Nagaland' , 'Tripura', 'Myanmaar'],
      answer: "Myanmaar"
    },
    {
      question: "Which is best place to go in winters in Maharastra ",
      options: ['Omkareshwar','Mahableshwar' ,'kokan', 'Lonavala'],
      answer: "Omkareshwar"
    },
];

const InputBox    = document.getElementById('input-box')
const EmailBox    = document.getElementById('email')
const PasswordBox = document.getElementById('passward')
const QuestionBox = document.getElementById('question-box')
const Question    = document.getElementById('question')
const Options     = document.getElementById('options')
const NextButton  = document.getElementById('next-btn')
const ResultBox   = document.getElementById('result')
const ScoreLabel  = document.getElementById('score')
const TimerSpan  = document.getElementById('timer')

let QuestionIndex = 0 
let quizScore     = 0
let optionSelected = false
let selectedAnswer = ''
let isRightAnswer = false
let timer = null
let timeLeft = 10
let quizRunning = true
    
function displayingQuestions(){
  clearInterval(timer)
  timeLeft = 10
  TimerSpan.innerText = timeLeft
  document.getElementById('timer').innerText = timeLeft
  startTimer()

  const currentQuestionData = quizQuestions[QuestionIndex]
  Question.innerText = currentQuestionData.question 

  Options.innerText=''
  currentQuestionData.options.map((singleOption)=>{
  const li = document.createElement('li')
  li.innerText=singleOption 
  li.addEventListener('click',()=>AfterClick(singleOption,li))
  Options.appendChild(li)
  })
  isRightAnswer =false
  optionSelected=false
}
function AfterClick(optionClicked , list){
  selectedAnswer =optionClicked
  const allOptions = Options.querySelectorAll('li')
  allOptions.forEach
  optionSelected=true
  selectedList = Options.querySelectorAll('li') 
      
Array.from(selectedList).map((li)=>{
  li.classList.remove('selected')
  })
  list.className = 'selected'
    
  if(optionClicked ==quizQuestions[QuestionIndex].answer){
    isRightAnswer =true
  }
}
function nextQuestion(){
    if(!optionSelected){
      alert('please select an option')
      return
    }
    QuestionIndex++   
    console.log("Next clicked - QuestionIndex:",QuestionIndex, "Total:", quizQuestions.length)
   if(isRightAnswer){
    quizScore++
   }
   clearInterval(timer)
  if(QuestionIndex < quizQuestions.length){
      displayingQuestions()
      startTimer()
    }else{
      console.log("Next clicked - QuestionIndex:",QuestionIndex, "Total:", quizQuestions.length)
      showResult()
    }
  }
function startTimer(){
  clearInterval(timer)
  timeLeft = 10
  document.getElementById('timer').innerText = timeLeft
  timer = setInterval(() => {
    if (!quizRunning){
      clearInterval(timer)
      return
    }
    timeLeft--
    document.getElementById('timer').innerText = timeLeft
    if (timeLeft <= 0){
      clearInterval (timer)
      nextQuestion()
      document.getElementById('timer').innerText=0
      if(QuestionIndex < quizQuestions.length-1){
        nextQuestion()
      }else{
        showResult()
      }
    }
  },1000)
}

function showResult(){
  clearInterval(timer)
  quizRunning = false
  TimerSpan.innerText = 0

  QuestionBox.style.display= 'none'
  NextButton.style.display= 'none'
  ResultBox.style.display='block'
  let message = ''
  if (quizScore < 3){
    message = 'Better luck next time!'
  }else if(quizScore < 6){
    message ='Good job!'
  }else{
    message = 'Excellent!'
  }
  ResultBox.innerHTML =`

  <p>You scored <b>${quizScore}</b> out of <b>${quizQuestions.length}</b>!</p>
  <span>${message}</span>`
  console.log("Result shown:", quizScore)

}


 NextButton.addEventListener('click',nextQuestion)
  displayingQuestions()


  console.log({QuestionBox,NextButton,ResultBox,ScoreLabel})