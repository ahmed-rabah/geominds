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




// functions

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
                area,borders,gini,
                capital,coatOfArms,
                continents,currencies,
                isoCode,idd:{root},
                landlocked,independent,
                Itld,unMember,timezones,
                subregion,status,
                startOfWeek,region,
                responseFulfiled = true
            } = countries.filter(country => country.name.common  === countryName)[0] ?? {name: countryName , responseFulfiled : false} ; 
             
            // translationLanguagesList(translations,name.nativeName);
            section.classList.add("justify-start");
            section.innerHTML = `<div class="country-names-flag">
                                        <img src="${flags.svg}" class="country-flag" alt="${name.common} flag">
                                        <div class="country-names">
                                            <div class="info-group official-name-group">
                                                <h3 class="label">official name</h3>
                                                <div class="info official-name">
                                                    <h3 class="english-official-name">${name.official}</h3>
                                                    <h3 class="seconadary-official-name">${name.official}</h3>
                                                </div>
                                            </div>
                                            <div class="info-group common-name-group">
                                                <h3 class="label">common name</h3>
                                                <div class="info common-name">
                                                    <h3 class="english-common-name">${name.common}</h3>
                                                    <h3 class="seconadary-common-name">${name.common}</h3>
                                                </div>
                                            </div>
                                            <div class="translations-caroussel">
                                                <div class="translations-button">
                                                    <h5>translations</h5>
                                                    <img src="./images/translations-right.png" class="right" alt="translations right arrow">
                                                    <img src="./images/translations-left.png" class="left hide" alt="leftarrow">
                                                </div>
                                                ${translationLanguagesList(translations,name.nativeName)}
                                            
                                            </div>
                                    </div>

                                    <div class="region">
                                        <div class="info-group">
                                            <h3 class="label">capital city</h3>
                                            <div class="info">
                                                <h3>${capital.join("--")}</h3>
                                            </div>
                                        </div>  
                                        <div class="info-group">
                                            <h3 class="label">continent</h3>
                                            <div class="info">
                                                <h3>${continents}</h3>
                                            </div>
                                        </div>
                                        <div class="info-group">
                                            <h3 class="label">subregion</h3>
                                            <div class="info">
                                                <h3>${subregion}</h3>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div class="more-info">
                                    <div class="info-group">
                                            <h3 class="label">independent</h3>
                                            <div class="info">
                                                <h3>${independent}</h3>
                                            </div>
                                    </div> 
                                    <div class="info-group">
                                            <h3 class="label">languages</h3>
                                            <div class="info">
                                                <h3>${languages}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">currency</h3>
                                            <div class="info">
                                                <h3>${currencies}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">area</h3>
                                            <div class="info">
                                                <h3>${area}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">land locked</h3>
                                            <div class="info">
                                                <h3>${landlocked}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">population</h3>
                                            <div class="info">
                                                <h3>${population}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">uNmember</h3>
                                            <div class="info">
                                                <h3>${unMember}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">timezone</h3>
                                            <div class="info">
                                                <h3>${timezones}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">start of week</h3>
                                            <div class="info">
                                                <h3>${startOfWeek}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">itld</h3>
                                            <div class="info">
                                                <h3>${Itld}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">iSO Code</h3>
                                            <div class="info">
                                                <h3>${isoCode}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">gini</h3>
                                            <div class="info">
                                                <h3>${gini}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">idd root</h3>
                                            <div class="info">
                                                <h3>${root}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">status</h3>
                                            <div class="info">
                                                <h3>${status}</h3>
                                            </div>
                                    </div>
                                    </div>
                                    <div class="location">
                                        <div class="info-group">
                                                <h3 class="label">maps</h3>
                                                <div class="info">
                                                    <h3>${maps}</h3>
                                                </div>
                                        </div>
                                        <div class="info-group">
                                                <h3 class="label">coat of armes</h3>
                                                <div class="info">
                                                    <h3>${coatOfArms}</h3>
                                                </div>
                                        </div>
                                        <div class="info-group">
                                                <h3 class="label">borders</h3>
                                                <div class="info">
                                                    <h3>${borders}</h3>
                                                </div>
                                        </div>
                                    </div>
    `; 
            translationListListeners(translations, name.nativeName) ; 
    });
}

function translationListListeners(translations , native){
        let leftTransBtn =  document.querySelector('.translations-button .left') ; 
        let rightTransBtn =  document.querySelector('.translations-button .right') ; 
        let translationList =  document.querySelector('.translations-list') ; 

        document.querySelector('.translations-button').addEventListener('click',()=>{
            [translationList,leftTransBtn,rightTransBtn].forEach(element=>{element.classList.toggle('hide')})
        })
        let selectedTranslationItem = document.querySelector('.translation-item.selected').dataset.languageCode ; 
        let {common , official} = translations[selectedTranslationItem] ?? native[selectedTranslationItem] ;
        document.querySelector('.seconadary-common-name').innerHTML = common;
        document.querySelector('.seconadary-official-name').innerHTML = official;
        // document.querySelector('.official-name');
        let translationItems = document.querySelectorAll('.translation-item') ; 
            translationItems.forEach(translation=>{
                translation.addEventListener("click",()=>{
                    document.querySelector('.translation-item.selected').classList.remove('selected');
                    translation.classList.add('selected'); 
                    let language = translation.dataset.languageCode ; 
                    let {common , official} = translations[language] ?? native[language]
                    document.querySelector('.seconadary-common-name').innerHTML = common;
                    document.querySelector('.seconadary-official-name').innerHTML = official;
                })
            })  
}

function translationLanguagesList(translations,nativeName = {}){
    let translationsCode = Object.keys(translations);
    let nativeKeys = Object.keys(nativeName) ;  
    for (let  key of nativeKeys) {
          if(!translationsCode.includes(key)){
           translationsCode.unshift(key) ; 
          } 
     }
     translationsCode.splice(translationsCode.indexOf('eng'),1)
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
     let translationsList = ` <ul role="list" class="translations-list hide" data-selected-translation=${translationsCode[0]}>` ; 
     translationsCode.forEach((code,index) => {
        (index == 0)  ? selected ="selected" : selected ="" ; 
         translationsList += `<li class="translation-item ${selected}" data-language-code="${code}">${languageInfo(code)}</li>`;
     })
     translationsList += `</ul>`;

     return translationsList ; 
}