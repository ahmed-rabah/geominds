import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.arrow'); 
console.log({continentsList,CtnArrow})

    CtnArrow.forEach(arrow=>arrow.addEventListener('click',slideContinents(continentsList)))
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  