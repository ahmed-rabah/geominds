import "./game.css";
import { getCountriesLevels ,  getCountries } from './components/utilities.js';

let AllCountries =  getCountries() ;
let levels = getCountriesLevels() ; 
let startQuizBtns = document.querySelectorAll('.quiz-start-btn') ; 
let container = document.querySelector('section.container') ; 
let quiz = document.querySelector('section.quiz') ; 
let quizContainer = document.querySelector('section.quiz .quiz-container') ; 
let endGameRecord = document.querySelector('section.end-game.new-record') ; 
let endGame = document.querySelector('section.end-game:not(.new-record)') ; 
let lifes = document.querySelector('.lifes') ; 
let lifesElements = document.querySelectorAll('.lifes .life') ; 
let textQuestion = document.querySelector('.question h3')
let imageQuestion = document.querySelector('.question img')
let optionsContainer = document.querySelector('.options')
let optionsParag = document.querySelectorAll('.option') ; 
let timer  , timeRemaining  ,  watchsetInterval ; 

// listeners
startQuizBtns.forEach(startQuizBtn=> {
    startQuizBtn.addEventListener('click', ()=> startQuiz())
})

// Functions
let hearts   ; 
let  score  ; 
let  questionNbr ; 
function startQuiz() {
    score = 0   ; 
    questionNbr = 0  ; 
    hearts  = 3 ; 
    [container,endGame,endGameRecord].forEach(element => {
        element.classList.add('hide')
    });
    quiz.classList.remove('hide')
    lifesUIHandler() ; 
    let question  = GenerateQuestion() ; 
    displayQuestion(question) ; 
}

function strictSwitchTabs(quizElement){
    let switchOut = false
    watchsetInterval = setInterval(() =>{
        if(document.hidden || document.msHidden || document.webkitHidden){
            switchOut = true
        }
        if(switchOut && !(document.hidden || document.msHidden || document.webkitHidden)){
            switchOut = false ; 
            clearInterval(timer)
            displayWarning() ; 
                document.querySelector('.warning .button')
                .addEventListener('click',
                ()=>{
                    continuePlaying(quizElement)
                     }, 
                     {once  : true}
                )  ; 
            
        }
   } , 5)
}
function continuePlaying(quizElement){
    document.querySelector(".warning").remove() ; 
    quizElement.then(({ options})=>{
        let correctAnswerID = options.filter(opt=>opt.isCorrectAnswer)[0].id ; 
        let Correctoption  ; 
        optionsParag.forEach(option=>{
            if(option.dataset.id === correctAnswerID){
                Correctoption = option ;
            }
        })
        displayResponse(correctAnswerID , Correctoption)
        optionsParag.forEach(option=> removeOptionEventListeners(option)) 
        lifesHandler(correctAnswerID ,"" , true) ;
        lifesUIHandler()
        setTimeout(() => {
            removeOptionStyling(optionsParag)
            setScore(0  , correctAnswerID ,"" , true)
            resetTimerUI()
            nextQuestion() ; 
        }, 1300);  
    })
}
function displayWarning(){
    let warning = `<div class="warning">
                    <h3 class="warning-text">
                    Warning: Leaving the website will result in the loss of a heart. Stay on this page to keep your progress intact.
                    </h3>
                    <h4 class="button bg-light-green">continue!</h4>
               </div>`
               quizContainer.insertAdjacentHTML('beforeend', warning)
}
function displayQuestion(quizElement){
    quizElement.then(({question , options})=>{
        clearInterval(watchsetInterval) ;
        strictSwitchTabs(quizElement) ; 
        let correctAnswerID = options.filter(opt=>opt.isCorrectAnswer)[0].id ; 
        textQuestion.innerHTML= question.p ;  
        imageQuestion.src= question.img; 
        optionsParag.forEach((option  , index)=>{
            option.innerHTML= options[index].countryInfo.name.common
            option.dataset.id= options[index].id ; 
            option.addEventListener('click' , ()=>{
                displayResponse(correctAnswerID , option)
                optionsParag.forEach(option=> removeOptionEventListeners(option)) 
                lifesHandler(correctAnswerID , option) ;
                lifesUIHandler()
                stopTimer() ;
                setTimeout(() => {
                    removeOptionStyling(optionsParag)
                    setScore(timeRemaining  , correctAnswerID , option)
                    nextQuestion() ; 
                }, 1300);
            },{once : true})
        }) 
    })
    setTimer(9 , quizElement)
}
function removeOptionStyling(optionsElem){
    optionsElem.forEach(option=>{
        option.classList.remove("right-option")
        option.classList.remove("wrong-option")
    })
}
function nextQuestion(){
    if(hearts > 0 ){
        let question  = GenerateQuestion() ; 
         displayQuestion(question) ; 
    }else{
        quiz.classList.add('hide')
        clearInterval(watchsetInterval) ; 
        endQuiz()
    }
}
function endQuiz(){
    let record =  localStorage.getItem('record') ;
    if(record < score){
        endGameRecord.classList.remove('hide')
        endGameRecord.querySelector('.quiz-score').innerHTML= score+`<br>pts` ; 
        localStorage.setItem('record', score);
        // DisplayEndQuiz(true) ; 
    } else{
        endGame.querySelector('.quiz-score').innerHTML= score+`<br>pts` ; 
        endGame.querySelector('.score h3.record span').innerHTML= record ; 
        endGame.classList.remove('hide')
        // DisplayEndQuiz(false) ; 
    }
}
// function DisplayEndQuiz(newRecord = true){
//     alert("ok")
// }
function setScore(points  , correctAnswerID , option , timeout = false){
    if(timeout){
        return ; 
    }else if(checkAnswer(correctAnswerID , option)){
        points = Math.floor(points/100);
       score += points ; 
    }
}
function lifesHandler(correctAnswerID , option , timeout=false ){
    if(timeout){
        hearts -- ; 
        return ; 
    }else if(!checkAnswer(correctAnswerID , option)){
        hearts -- ; 
    }
}
function lifesUIHandler(){
    console.log(hearts);
    lifesElements.forEach((elem , index)=>{
        elem.classList.remove('gone')
        if(index >= hearts){
            elem.classList.add('gone')
        }
    })
}
function checkAnswer(correctAnswerID , option){
    let anwserID = option.dataset.id ; 
    return anwserID === correctAnswerID  ; 
}
function displayResponse(correctAnswerID , option){
    if(checkAnswer(correctAnswerID , option)){
        option.classList.add('right-option') 
    }else{
        option.classList.add('wrong-option') 
        optionsParag.forEach(optionElement=>{
            if(optionElement.dataset.id == correctAnswerID){
                optionElement.classList.add('right-option') ; 
            }
        }); 

    }
}
function  GenerateQuestion(){
    questionNbr++ ; 
  return  ( levels.then(countries=>{
                if(questionNbr < 30){
                    countries = countries[0]
                }else if(questionNbr < 60){
                    countries = countries[0].concat(countries[1])

                }else{
                    countries = countries.flat()       
                }
            let country = countries[random(0,countries.length)]
            let options = [
                {id  : RandomId() , countryInfo  : getDiffCountry(countries,country) , isCorrectAnswer :  false},
                {id  : RandomId() , countryInfo  : getDiffCountry(countries,country) , isCorrectAnswer :  false},
                {id  : RandomId() , countryInfo  :  country  , isCorrectAnswer :  true},
                {id  : RandomId() , countryInfo  : getDiffCountry(countries,country) , isCorrectAnswer :  false}
                        ] ;
            shuffle(options)                         
            let quizQuestion = {
                question : { p :"which country is this ?"  , img : country.flags.svg}  , 
                options : options
            }
            // console.log(quizQuestion.options);
            return quizQuestion
            }) )
}
// function randomCountryAttribute(country){
//     let hasAttribute = []
    
// } 
function setTimer(duration , quizElement){
    duration *=1000 ; 
    let circle = document.getElementById('cr'); 
    let dashArray = circle.attributes['stroke-dasharray'].value;
    let time = duration ; 
     timer = setInterval(function() {
    let end  = duration ; 
    circle.style.strokeDashoffset  = dashArray - (dashArray * time) / end ; 
    let second = Math.ceil((time/1000)) ; 
    document.getElementById('timer').lastElementChild.innerHTML = second ; 
    timeRemaining  =time  ;
    time  = time - 10 ; 
    if(time < 0){
        clearInterval(timer)
        quizElement.then(({ options})=>{
            let correctAnswerID = options.filter(opt=>opt.isCorrectAnswer)[0].id ; 
            let Correctoption  ; 
            optionsParag.forEach(option=>{
                if(option.dataset.id === correctAnswerID){
                    Correctoption = option ;
                }
            })
            displayResponse(correctAnswerID , Correctoption)
            optionsParag.forEach(option=> removeOptionEventListeners(option)) 
            lifesHandler(correctAnswerID ,"" , true) ;
            lifesUIHandler()
            setTimeout(() => {
                removeOptionStyling(optionsParag)
                setScore(0  , correctAnswerID ,"" , true)
                resetTimerUI()
                nextQuestion() ; 
            }, 1300);  
        })
        }
    if(time < ( end / 5 )){
        document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
    }
    if(time < (end / 3)){
        document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
        // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
    }
    },10)
    
}
function stopTimer() {
    clearInterval(timer) ; 
    resetTimerUI()
}
function resetTimerUI(){
    // let circle = document.getElementById('cr'); 
    document.querySelector('svg circle:last-child').style.stroke = '' ; 
    document.querySelector('svg circle:first-child').style.stroke = '' ; 
   
}
function getDiffCountry(countries,country){
    let diffCountry  ; 
    do {
       diffCountry =   countries[random(0,countries.length)]
    } while (diffCountry.cca3 == country.cca3);
    return diffCountry ; 
}
function removeOptionEventListeners(option) {
    const newOption = option.cloneNode(true);
    option.parentNode.replaceChild(newOption, option);
     optionsParag = document.querySelectorAll('.option') ; 
  }
  
function random(min =0, max) {
    return Math.floor( min + Math.random() * (max - min) );

}
function RandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';
  
    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomId += characters.charAt(randomIndex);
    }
  
    return randomId;
  }
function shuffle(array) {
  array.sort(() => random(0,5)%2 == 0 ? -1 : 1 );
}

// function setTimer(duration) {
//         let time = duration ; 
//         let x = setInterval(function() {
//         let end  = duration ; 
//         let second = Math.ceil((time/1000)) ; 
//         document.getElementById('timer').innerHTML = second+" seconds" ; 
//         time  = time - 10 ; 
//         console.log(second);
//         if(time < 0){
//             clearInterval(x)
//         }
//         // if(time < ( end / 5 )){
//             //     document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//             // }
//             // if(time < (end / 3)){
//                 //     document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
//                 //     // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//                 // }
//         },10)
// }


