import './explorer.css'
// import {countriesSearchList , getCountries , setCountriesListeners} from './components/sideCountriesList.js';
import languageInfo from './components/languageCodeName.js';

let continentsList = document.querySelector('.continents-list') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
let controlIcons = document.querySelector('.control-icons');
let searchIcon = document.querySelector('.icon-search');  
let closeSearchIcon = document.querySelector('.icon-close-search');  
let aside = document.querySelector('aside'); 
let footer = document.querySelector('footer'); 
let section = document.querySelector('section'); 
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
        let {   name,flags,
                translations,
                languages,
                maps,population,
                area,borders,
                capital,coatOfArms,
                continents,currencies,
                isoCode,idd:{root},
                landlocked,independent,
                tld,unMember,timezones,
                subregion,status,
                startOfWeek,region,
                responseFulfiled = true
            } = countries.filter(country => country.name.common  === countryName)[0] ?? {name: countryName , responseFulfiled : false} ; 
             
            translationLanguagesList(translations,name.nativeName);
            section.innerHTML = `<div class="country-names-flag">
                                <img src="${flags.svg}" class="country-flag>
                                <div class="country-names">
                                    <div className="official-name-group">
                                        <h3 className="label">official name</h3>
                                        <div className="official-name flex-name">
                                            <h3 className="english-oficcial-name">${name.official}</h3>
                                            <h3 className="seconadary-oficcial-name">${name.official}</h3>
                                        </div>
                                    </div>
                                    <div className="common-name-group">
                                        <h3 className="label">common name</h3>
                                        <div className="common-name flex-name">
                                            <h3 className="english-common-name">${name.common}</h3>
                                            <h3 className="seconadary-common-name">${name.common}</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="translations-caroussel">
                                    <div class="translations-button">
                                        <h5>translations</h5>
                                        <img src="./images/translations-right.png" alt="translations right arrow">
                                        <img src="./images/translations-left.png" alt="leftarrow">
                                    </div>
                                    ${translationLanguagesList(translations,name.nativeName)}
                                   
                                </div>
                                </div>
                                
                                `; 
            
    });
}

function translationLanguagesList(translations,nativeName){
    let translationsCode = Object.keys(translations);
    let nativeKeys = Object.keys(nativeName) ;  
    for (let  key of nativeKeys) {
          if(!translationsCode.includes(key)){
           translationsCode.unshift(key) ; 
          } 
     }
     translationsCode.splice(translationsCode.indexOf('eng'),1)
     console.log(translationsCode)
     translationsCode.sort((a,b)=>{
            if(nativeKeys.includes(a) && !nativeKeys.includes(b) ){
                return -1 ; 
            }else if(!nativeKeys.includes(a) && nativeKeys.includes(b)){
                return 1
            }else if((nativeKeys.indexOf(a)+1 > nativeKeys.indexOf(b)+1) || ( a=="eng" && nativeKeys.includes(b))){
                return 1 ; 
            }else if((nativeKeys.indexOf(a)+1 < nativeKeys.indexOf(b)+1) || ( nativeKeys.includes(a) && b=="eng")){
                return -1 ; 
            }else{
                return 0 ; 
            }
     }) ; 
     let selected = "";
     let translationsList = ` <ul role="list" class="translations-list">` ; 
     translationsCode.forEach((code,index) => {
        (index == 0)  ? selected ="selected" : selected ="" ; 
         translationsList += `<li className="translation-item ${selected}" data-language-code="${code}">${languageInfo(code)}</li>`;
     })
     translationsList += `</ul>`;
     return translationsList ; 
}