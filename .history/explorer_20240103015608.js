import './explorer.css'
import {countriesSearchList , getCountries} from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
let searchIcon = document.querySelector('.control-icons');
let searchCountriesElement = document.querySelector('aside'); 
let data = getCountries();

searchIcon.addEventListener('click',(event)=>{
    searchCountriesElement.classList.toggle('closed-aside') ;
    console.log(event.target)
})
CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));
window.addEventListener('DOMContentLoaded',()=>{
    let list = countriesSearchList(data) ;     
    list.then(countriesSearchItems => {
        searchCountriesElement.insertAdjacentHTML('beforeend',countriesSearchItems) ; 
    })
    
})
function slideContinents(list,direction){
    // let clientWidth = list.clientWidth ; 
    // let scrollWidth = list.scrollWidth ;
    // let scrollLeft = list.scrollLeft ;
    console.log(list.scrollLeft+" before")
    if(direction == "right"){
        list.scrollLeft += list.clientWidth ; 
    }
    if (direction == "left") {
        list.scrollLeft -= list.clientWidth ; 
    }
    if(list.scrollLeft == 0){
        leftArrow.style.display = "none";
        rightArrow.style.display = "block"
    }else if(list.scrollLeft == list.scrollWidth - list.clientWidth ){
        leftArrow.style.display = "block";
        rightArrow.style.display = "none";
    }else{
        leftArrow.style.display = "block";
        rightArrow.style.display = "block";
    }
    console.log(list.scrollLeft+" after")

}
