import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnLeftArrow = document.querySelector('.arrow-left'); 
let CtnRightArrow = document.querySelector('.arrow-right'); 
console.log({continentsList,
    CtnLeftArrow,
    CtnRightArrow})

    CtnRightArrow.addEventListener('click',slideContinents(continentsList,"right"))
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  