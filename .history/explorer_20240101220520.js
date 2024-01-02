import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
console.log({continentsList,CtnArrow})

    CtnArrow.forEach(arrow=>arrow.addEventListener('click',slideContinents(continentsList,arrow.dataList.arrowDirection)));
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  

function slideContinents(list,direction){
    let clientWidth = list.clientWidth ; 
    let scrollWidth = list.scrollWidth ;
    let scroolLeft = list.scrollLeft ;
    if(direction == "right"){
        list.scrollLeft += clientWidth ; 
        
    }

}