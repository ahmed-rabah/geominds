import './explorer.css'
// import {countriesSearchList , getCountries , setCountriesListeners} from './components/sideCountriesList.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
let controlIcons = document.querySelector('.control-icons');
let searchIcon = document.querySelector('.icon-search');  
let closeSearchIcon = document.querySelector('.icon-close-search');  
let aside = document.querySelector('aside'); 
let footer = document.querySelector('footer'); 
let Allcountries =  getCountries();

//listeners
window.addEventListener('DOMContentLoaded',()=>{
    let list = countriesSearchList(Allcountries) ;     
    list.then(countriesSearchItems => {
        aside.insertAdjacentHTML('beforeend',countriesSearchItems) ; 
        setCountriesListeners() ; 
    })
    // console.log(countries);
})
window.addEventListener('scroll',()=>{
    if(window.pageYOffset >=  66){
        aside.style.top=  "70px";
    }else{
        aside.style.top=  (70 + 60)+"px" ; 
    } 
    // let footerY=footer.getBoundingClientRect(); 
    // let asideBottom=aside.getBoundingClientRect() ; 
    // console.log("footerY :  ");
    // console.log(footerY);
    // console.log("asideBottom :  ");
    // console.log(asideBottom);
    //  if(footerY <= asideBottom ){
    //     aside.classList.add('aside-coordinate')
    // }else{
    //      aside.classList.remove('aside-coordinate')
    //  }

})

controlIcons.addEventListener('click',()=>{
    aside.classList.toggle('closed-aside') ;
    closeSearchIcon.classList.toggle('hide') ; 
    searchIcon.classList.toggle('hide') ; 
})
CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));
function slideContinents(list,direction){
    // let clientWidth = list.clientWidth ; 
    // let scrollWidth = list.scrollWidth ;
    // let scrollLeft = list.scrollLeft ;
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
}



// functions

async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

function countriesSearchList(list){
   return list.then((countries) => {console.log(countries[100]);
    let htmlSearchList = `` ; 
        countries.forEach(({name,flags}) => {
            htmlSearchList += `
                <div class="country-search-group"  data-country-name="${name.common}">
                    <img src="${flags.svg}" alt="${flags.alt}" class="country-icon-img" />
                    <h4 class="country-name">${name.official}</h4>
                </div>
            `;
        })
        return htmlSearchList ; 
    })
}

function setCountriesListeners(){
    let countries =  document.querySelectorAll('.country-search-group') ; 

    countries.forEach(country => {
        country.addEventListener("click",()=>{

            displayCountry(country.dataset.countryName)
            
        })
    })
}

function displayCountry(countryName){
    Allcountries.then(countries=>{
         return countries.filter(country => country.name.common  === countryName)[0] ; 
    });
}

