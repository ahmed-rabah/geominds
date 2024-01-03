import './explorer.css'
import {countriesSearchList , getCountries} from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
let controlIcons = document.querySelector('.control-icons');
let searchIcon = document.querySelector('.icon-search');  
let closeSearchIcon = document.querySelector('.icon-close-search');  
let aside = document.querySelector('aside'); 
let footer = document.querySelector('footer'); 
let data = getCountries();

window.addEventListener('scroll',()=>{
    let footerY=footer.getBoundingClientRect().y ; 
    let asideBottom=aside.getBoundingClientRect().bottom ; 
    console.log("footerY :  "+footerY);
    console.log("asideBottom :  "+asideBottom);
     if(footerY <= asideBottom){
        aside.classList.add('aside-coordinate')
        aside.style.bottom = asideBottom ; 
        aside.style.top =0 ; 
    }else{
         aside.classList.remove('aside-coordinate')
     }

})
controlIcons.addEventListener('click',()=>{
    aside.classList.toggle('closed-aside') ;
    closeSearchIcon.classList.toggle('hide') ; 
    searchIcon.classList.toggle('hide') ; 
})
CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));
window.addEventListener('DOMContentLoaded',()=>{
    let list = countriesSearchList(data) ;     
    list.then(countriesSearchItems => {
        aside.insertAdjacentHTML('beforeend',countriesSearchItems) ; 
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
