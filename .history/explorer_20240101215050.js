import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.arrow-left'); 
console.log({continentsList,
    CtnArrow})

    CtnRightArrow.addEventListener('click',slideContinents(continentsList,"right"))
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  