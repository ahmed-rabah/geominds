import './explorer.css'
// import countries from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
console.log({continentsList,CtnArrow})

    CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));
// let data = countries()
// data.then(countries=>{countries.map(country=>console.log(country.name))});  

function slideContinents(list,direction){
    // let clientWidth = list.clientWidth ; 
    // let scrollWidth = list.scrollWidth ;
    // let scrollLeft = list.scrollLeft ;

    if(direction == "right"){
        list.scrollLeft += list.clientWidth ; 
        
    }
    if (direction == "left") {
        
    }
    if(list.scrollLeft == 0){
        leftArrow.style.display = "none";
        rightArrow.style.display = "block"
    }else if(list.scrollLeft == list.scrollWidth){
        rightArrow.style.display = "none";
        leftArrow.style.display = "block";
    }else{
        rightArrow.style.display = "block";
        leftArrow.style.display = "block";
    }

}