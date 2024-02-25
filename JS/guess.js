import "../css/game.css";

// import { getCountriesLevels ,  getCountries } from '../components/utilities.js';

// let AllCountries =  getCountries() ;
// // let levels = getCountriesLevels() ; 
// let startGameBtns = document.querySelectorAll('.game-start-btn') ; 
// let container = document.querySelector('section.container') ; 
// let game = document.querySelector('section.guessing-game') ; 
// let GameContainer = document.querySelector('section.guessing-game .guess-container') ; 
// let endGameRecord = document.querySelector('section.end-game.new-record') ; 
// let endGame = document.querySelector('section.end-game:not(.new-record)') ; 
// let lifes = document.querySelector('.lifes') ; 
// let lifesElements = document.querySelectorAll('.lifes .life') ; 
// let countryName = document.querySelector('.country-name')
// let timer  , timeRemaining  ,  watchsetInterval ; 
// // let textQuestion = document.querySelector('.question h3')
// // let imageQuestion = document.querySelector('.question img')
// // let optionsContainer = document.querySelector('.options')
// // let optionsParag = document.querySelectorAll('.option') ; 

// const mapid =L.map('mapid',{
//     maxZoom: 20,
//     minZoom: 0,
//     zoomSnap : 0.1 ,
//     }).setView([30,0] , 1);

// /// map styling
// const normalStyling  = {
//     fillColor: 'var(--clr-primary-1)',
//     weight: 1,
//     opacity: 1,
//     color: 'white',
//     // dashArray: '3',
//     fillOpacity: 1, 
// };
// const rightStyling  = {
//     fillColor: 'var(--clr-light-green)',
//     weight: 1,
//     opacity: 1,
//     color: 'white',
//     // dashArray: '3',
//     fillOpacity: 1, 
// };
// const wrongStyling  = {
//     fillColor: 'var(--clr-danger)',
//     weight: 1,
//     opacity: 1,
//     color: 'white',
//     // dashArray: '3',
//     fillOpacity: 1, 
// };

// // listeners
// let mapLoad =  fetch('../worldgeoJSON.json')
// .then(res=>res.json())
// .then(geoJSONS=>{
//     var overallBounds = L.latLngBounds();
//     let main  = geoJSONS.main;
//     let GEOArr = {};
//     main.forEach(geo => {
//         let geojson =  L.geoJson( {id : geo.iso3 , name  : geo.name,   type : geo.type, geometry : geo.geometry}, {style: normalStyling}).addTo(mapid);
//         if(geo.name !== "Antarctica"){
//             overallBounds.extend(geojson.getBounds());
//         }
// GEOArr = {...GEOArr , [geo.name] : {geojson} }

// });
// console.log(GEOArr);
// console.log(overallBounds);
// overallBounds = L.latLngBounds([overallBounds.getSouth() - 10, overallBounds.getWest()], overallBounds.getNorthEast());

// mapid.fitBounds(overallBounds);
// // overallBounds.pad(0.3) ; 
// mapid.setMaxBounds(overallBounds);
// mapid.fitWorld(overallBounds)
// // mapid.addEventListener('click', onMapClick);
// return {GEOArr , main}
// })
// // mapLoad.then(m=>console.log(m))


// startGameBtns.forEach(startGameBtn=> {
//     startGameBtn.addEventListener('click', ()=> startQuiz())
// })

// // Functions
// let hearts   ; 
// let  score  ; 
// let  questionNbr ; 
// async function startQuiz() {
    
// mapLoad.then(({GEOArr , main})=>{
//     console.log(GEOArr);
//     console.log(main);
//     score = 0   ; 
//     questionNbr = 0  ; 
//     hearts  = 3 ; 
//     [container,endGame,endGameRecord].forEach(element => {
//         element.classList.add('hide')
//     });
//     game.classList.remove('hide')
//     lifesUIHandler() ; 
    
//     AllCountries.then(countries=>{
//         let randomCountry  = RandomCountry(countries) ; 
//         displayQuestion(mapid ,countries ,  randomCountry , GEOArr , main)
//     })
// }); 

// }

// function strictSwitchTabs(gameElement){
//     let switchOut = false
//     watchsetInterval = setInterval(() =>{
//         if(document.hidden || document.msHidden || document.webkitHidden){
//             switchOut = true
//         }
//         if(switchOut && !(document.hidden || document.msHidden || document.webkitHidden)){
//             switchOut = false ; 
//             clearInterval(timer)
//             displayWarning() ; 
//                 document.querySelector('.warning .button')
//                 .addEventListener('click',
//                 ()=>{
//                     continuePlaying(gameElement)
//                      }, 
//                      {once  : true}
//                 )  ; 
            
//         }
//    } , 5)
// }
// // function continuePlaying(gameElement){
// //     document.querySelector(".warning").remove() ; 
// //     gameElement.then(({ options})=>{
// //         let correctAnswerID = options.filter(opt=>opt.isCorrectAnswer)[0].id ; 
// //         let Correctoption  ; 
// //         optionsParag.forEach(option=>{
// //             if(option.dataset.id === correctAnswerID){
// //                 Correctoption = option ;
// //             }
// //         })
// //         displayResponse(correctAnswerID , Correctoption)
// //         // optionsParag.forEach(option=> removeOptionEventListeners(option)) 
// //         lifesHandler(correctAnswerID ,"" , true) ;
// //         lifesUIHandler()
// //         setTimeout(() => {
// //             // removeOptionStyling(optionsParag)
// //             setScore(0  , correctAnswerID ,"" , true)
// //             resetTimerUI()
// //             nextQuestion() ; 
// //         }, 1300);  
// //     })
// // }
// // function displayWarning(){
// //     let warning = `<div class="warning">
// //                     <h3 class="warning-text">
// //                     Warning: Leaving the website will result in the loss of a heart. Stay on this page to keep your progress intact.
// //                     </h3>
// //                     <h4 class="button bg-light-green">continue!</h4>
// //                </div>`
// //                GameContainer.insertAdjacentHTML('beforeend', warning)
// // }
// function displayQuestion(mapid ,countries ,  country , GEOArr , main){
   
//         // clearInterval(watchsetInterval) ;
//         // strictSwitchTabs(gameElement) ; 
    
//             countryName.innerHTML= country.name.official ;  
//             mapid.once('click' ,(e)=>onMapClick(e ,countries , country , GEOArr , main , mapid)) ; 
//             setTimer(9 ,countries ,  country , GEOArr , main , mapid)
           
//             // (e)=>{
//             //     displayResponse(e.latlng , country)
//             //     // optionsParag.forEach(option=> removeOptionEventListeners(option)) 
//             //     lifesHandler(correctAnswerID) ;
//             //     lifesUIHandler()
//             //     stopTimer() ;
//             //     setTimeout(() => {
//             //         // removeOptionStyling(optionsParag)
//             //         setScore(timeRemaining  , correctAnswerID , option)
//             //         nextQuestion() ; 
//             //     }, 1300);
//             // })

//         // }) 
   
// }
// // function removeOptionStyling(optionsElem){
// //     optionsElem.forEach(option=>{
// //         option.classList.remove("right-option")
// //         option.classList.remove("wrong-option")
// //     })
// // }
// function nextQuestion(mapid ,countries ,  GEOArr , main){
//     if(hearts > 0 ){
//         let randomCountry  = RandomCountry(countries) ; 
//          displayQuestion(mapid ,countries ,  randomCountry , GEOArr , main) ; 
//     }else{
//         game.classList.add('hide')
//         clearInterval(watchsetInterval) ; 
//         endGuessingGame()
//     }
// }
// function endGuessingGame(){
//     // mapid.remove();
//     let record =  localStorage.getItem('guessRecord') ;
//     if(record < score){
//         endGameRecord.classList.remove('hide')
//         endGameRecord.querySelector('.game-score').innerHTML= score+`<br>pts` ; 
//         localStorage.setItem('guessRecord', score);
//         // DisplayendGuessingGame(true) ; 
//     } else{
//         endGame.querySelector('.game-score').innerHTML= score+`<br>pts` ; 
//         endGame.querySelector('.score h3.record span').innerHTML= record ; 
//         endGame.classList.remove('hide')
//         // DisplayendGuessingGame(false) ; 
//     }
// }
// // function DisplayendGuessingGame(newRecord = true){
// //     alert("ok")
// // }
// function setScore(points = 0 , wrongAnswer= false ,  timeout = false){
//     if(timeout || wrongAnswer){
//         return ; 
//     }else{
//         points = Math.floor(points/200);
//        score += points ; 
//     }
// }
// function lifesHandler(wrongAnswer = false , timeout=false ){
//     if(timeout || wrongAnswer){
//         hearts -- ; 
//     }
// }
// function lifesUIHandler(){
//     console.log(hearts);
//     lifesElements.forEach((elem , index)=>{
//         elem.classList.remove('gone')
//         if(index >= hearts){
//             elem.classList.add('gone')
//         }
//     })
// }
// // function checkAnswer(correctAnswerID , option){
// //     let anwserID = option.dataset.id ; 
// //     return anwserID === correctAnswerID  ; 
// // }
// function displayResponse(e , country , GEOArr , main , mapid , timeUp = false){
//     let name  = country.name.common ;
//     let loseHeart = false ; 
//     if(timeUp){
//         GEOArr[name].geojson.setStyle(rightStyling).addTo(mapid);
//          loseHeart = true ;
//     }else{

//         let response =  main.find(geo => {
//             let geoJSONN =  L.geoJson({type : geo.type, geometry : geo.geometry})
//             if(leafletPip.pointInLayer(e.latlng, geoJSONN).length > 0){
//                 // return {name : geo.name , id : geo.iso3 , geo_JSON : geoJSONN}
//                 return  1
//             }
//         });
//         // console.log(response);
//         // console.log(GEOArr[response.name].geojson);
        
//         if(response.name == name){
//             GEOArr[response.name].geojson.setStyle(rightStyling).addTo(mapid);
//             // return false ; 
//         }else{
//             GEOArr[name].geojson.setStyle(rightStyling).addTo(mapid);
//             GEOArr[response.name].geojson.setStyle(wrongStyling).addTo(mapid);
//                 loseHeart =  true
//             setTimeout(()=>{
//                 GEOArr[response.name].geojson.setStyle({fillColor : 'var(--clr-primary-1)'}).addTo(mapid); 
//                 //   mapid.addEventListener('click', onMapClick);

                
//             },1300)
            
//         }
//     }
//     return loseHeart ; 
// }
// function  RandomCountry(countries){
//     questionNbr++ ; 
//   return   countries[random(0,countries.length)]
// }


// // function randomCountryAttribute(country){
// //     let hasAttribute = []
    
// // } 
// function setTimer(duration ,countries  ,  country , GEOArr , main , mapid){
//     duration *=1000 ; 
//     let circle = document.getElementById('cr'); 
//     let dashArray = circle.attributes['stroke-dasharray'].value;
//     let time = duration ; 
//      timer = setInterval(function() {
//     let end  = duration ; 
//     circle.style.strokeDashoffset  = dashArray - (dashArray * time) / end ; 
//     let second = Math.ceil((time/1000)) ; 
//     document.getElementById('timer').lastElementChild.innerHTML = second ; 
//     timeRemaining  =time  ;
//     time  = time - 10 ; 
//     if(time < 0){
//         clearInterval(timer)


//             displayResponse(null , country , GEOArr , main , mapid , true)
//             // optionsParag.forEach(option=> removeOptionEventListeners(option)) 
//             lifesHandler(true) ;
//             lifesUIHandler()
//             setTimeout(() => {
//                 // removeOptionStyling(optionsParag)
//                 setScore()
//                 resetTimerUI()
//                 nextQuestion(mapid ,countries , GEOArr , main) ; 
//             }, 1300);  
        
//         }
//     if(time < ( end / 5 )){
//         document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     }
//     if(time < (end / 3)){
//         document.querySelector('svg circle:first-child').style.stroke = 'red' ; 
//         // document.querySelector('svg circle:last-child').style.stroke = 'red' ; 
//     }
//     },10)
    
// }
// function stopTimer() {
//     clearInterval(timer) ; 
//     resetTimerUI()
// }
// function resetTimerUI(){
//     // let circle = document.getElementById('cr'); 
//     document.querySelector('svg circle:last-child').style.stroke = '' ; 
//     document.querySelector('svg circle:first-child').style.stroke = '' ; 
   
// }





// function random(min =0, max) {
//     return Math.floor( min + Math.random() * (max - min) );

// }

// function onMapClick(e , countries , country , GEOArr , main , mapid)
// {
//     // let name  = country.name.common
//     stopTimer() ;
//     let wrongAnswer  = displayResponse(e , country , GEOArr , main , mapid)
//     console.log(wrongAnswer);
//     lifesHandler(wrongAnswer) ;
//     lifesUIHandler()
//     setTimeout(() => {
//         // removeOptionStyling(optionsParag)
//         setScore(timeRemaining , wrongAnswer)
//         resetTimerUI()
//         nextQuestion(mapid ,countries , GEOArr , main) ; 
//     }, 1300);  
// }

// // mapid.on('click', onMapClick);
// // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
// // maxZoom: 19,
// // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
// // }).addTo(mapid);