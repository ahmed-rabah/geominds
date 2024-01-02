import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = CtnArrow.querySelector('.arrow-left');
let rightArrow = CtnArrow.querySelector('.arrow-right');
console.log({continentsList,CtnArrow})

    CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  

function slideContinents(list,direction){
    let clientWidth = list.clientWidth ; 
    let scrollWidth = list.scrollWidth ;
    let scrollLeft = list.scrollLeft ;

    if(direction == "right"){
        list.scrollLeft += clientWidth ; 
        
    }
    if (direction == "left") {
        
    }
    if(scrollLeft == 0){
        leftArrow.style.display = "none";
    }else{
        leftArrow.style.display = "block"
    }

}