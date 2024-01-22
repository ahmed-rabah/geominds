import "./game.css";
import { getCountriesLevels ,  getCountries } from './components/utilities.js';

let AllCountries =  getCountries() ;
let levels = getCountriesLevels() ; 
let startQuizBtn = document.querySelector('.quiz-start-btn') ; 
let lifes = document.querySelector('.lifes') ; 
let lifesElements = document.querySelectorAll('.lifes .life') ; 
let textQuestion = document.querySelector('.question h3')
let imageQuestion = document.querySelector('.question img')
let optionsContainer = document.querySelector('.options')
let optionsParag = document.querySelectorAll('.option') ; 


// listeners

startQuizBtn.addEventListener('click', ()=> startQuiz())

// Functions
let hearts  = 3 ; 
let score  = 0 ; 
let questionNbr = 0 ; 
function startQuiz() {
    let question  = GenerateQuestion() ; 
    displayQuestion(question) ; 
}


function displayQuestion(quizElement){
    quizElement.then(({question , options})=>{
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
                setTimeout(() => {
                    removeOptionStyling(optionsParag)
                    setScore(correctAnswerID , option)
                    nextQuestion() ; 
                }, 1300);
            },{once : true})
        }) 
    })
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
        endQuiz()
    }
}
function endQuiz(){
    let prevRecord =  localStorage.getItem('record') ;
    if(prevRecord < score){
        localStorage.setItem('record', score);
        // DisplayEndQuiz(true) ; 
    } else{
        // DisplayEndQuiz(false) ; 
    }
}
function DisplayEndQuiz(newRecord = true){
    alert("ok")
}
function setScore(correctAnswerID , option){
    if(checkAnswer(correctAnswerID , option)){
       score += 100 ; 
    }
    console.log(score);
}
function lifesHandler(correctAnswerID , option){
    if(!checkAnswer(correctAnswerID , option)){
        hearts -- ; 
    }
}
function lifesUIHandler(){
    console.log(hearts);
    lifesElements.forEach((elem , index)=>{
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

// function timer(duration){
//     let circle = document.getElementById('cr'); 
//     let dashArray = circle.attributes['stroke-dasharray'].value;
//     let time = duration ; 
//     let x = setInterval(function() {
//     let end  = duration ; 
//     circle.style.strokeDashoffset  = dashArray - (dashArray * time) / end ; 
//     let second = Math.ceil((time/1000)) ; 
//     // document.getElementById('timer').lastElementChild.innerHTML = second+" seconds" ; 
//     time  = time - 10 ; 
//     if(time < 0){
//         clearInterval(x)
//     }
//     // if(time < ( end / 5 )){
//     //     document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     // }
//     // if(time < (end / 3)){
//     //     document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
//     //     // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     // }
//     },10)

// }
// timer(9) ; 
