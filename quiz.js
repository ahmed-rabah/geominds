import "./game.css";
import { getCountriesLevels ,  getCountries } from './components/utilities.js';

let AllCountries =  getCountries() ;
let levels = getCountriesLevels() ; 
let startQuizBtn = document.querySelector('.quiz-start-btn') ; 


// listeners

startQuizBtn.addEventListener('click', ()=> startQuiz())

// Functions
let hearts  = 3 ; 
let score  = 0 ; 
let questionNbr = 0 ; 
function startQuiz() {
    
    generateQuestion() ; 
}

function  generateQuestion(){
    questionNbr++ ; 
    levels.then(countries=>{
                if(questionNbr < 30){
                    countries = countries[0]
                }else if(questionNbr < 60){
                    countries = countries[0].concat(countries[1])

                }else{
                    countries = countries.flat()       
                }
            let country = countries[random(0,countries.length)]
            
            })
}
function getDiffCountry(countries,country){
    let diffCountry  ; 
    do {
       diffCountry =   countries[random(0,countries.length)]
    } while (diffCountry.cca3 == country.cca3);
    return diffCountry ; 
}
function random(min =0, max) {
    return Math.floor( min + Math.random() * (max - min) );
  }

// function timer(duration){
//     let circle = document.getElementById('cr'); 
//     let dashArray = circle.attributes['stroke-dasharray'].value;
//     let time = duration ; 
//     let x = setInterval(function() {
//     let end  = duration ; 
//     circle.style.strokeDashoffset  = dashArray - (dashArray * time) / end ; 
//     let second = Math.ceil((time/1000)) ; 
//     timer.lastElementChild.innerHTML = second+" seconds" ; 
//     time  = time - 10 ; 
//     if(time < 0){
//         clearInterval(x)
//     }
//     if(time < ( end / 5 )){
//         document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     }
//     // if(time < (end / 3)){
//     //     document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
//     //     // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     // }
//     },10)

// }
// timer(9) ; 