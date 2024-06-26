//img 
import dead from "../images/dead.svg" ; 
import smallLeftArrow from "../images/small-left-arrow.svg" ; 
import smallRightArrow from "../images/small-right-arrow.svg" ; 
import link from "../images/link.png" ; 
import plus from "../images/plus.png" ; 
import minus from "../images/minus.png" ; 


import "../components/header.js"
import "../components/footer.js"
import '../css/main.css';
import "./main.js"
// import '../css/style.css';
import '../css/explorer.css'
//leaflet Library
// // import "leaflet/dist/leaflet.css" ; 
// import "leaflet/dist/leaflet.js" ; 
//utilities functions 
import languageInfo,{countryGeoJSON , applyCountryGeoJSON,  getCountries } from '../components/utilities.js';

let continentsList = document.querySelector('.continents-list') ; 
let continentsCaroussel = document.querySelector('.continents-caroussel') ; 
let continentsBtns = document.querySelectorAll('.continent-btn ') ; 
let CtnArrow = document.querySelectorAll('.horizontal-arrow'); 
let leftArrow = document.querySelector('.arrow-left');
let rightArrow = document.querySelector('.arrow-right');
let controlIcons = document.querySelector('.control-icons');
let searchIcon = document.querySelector('.icon-search');  
let closeSearchIcon = document.querySelector('.icon-close-search');  
let aside = document.querySelector('aside'); 
let contriesList = document.querySelector('.countries-list')
// let footer = document.querySelector('footer'); 
let section = document.querySelector('section'); 
let Allcountries =  getCountries();
let countriesInput = document.querySelector('.countries-input') ; 
//listeners
window.addEventListener('DOMContentLoaded',()=>{
    let list = countriesSearchList(Allcountries) ;     
    list.then(countriesSearchItems => {
        contriesList.innerHTML = countriesSearchItems ; 
        setCountriesListeners() ; 
    })
})

continentsBtns.forEach(btn=>{

    btn.addEventListener("click",()=>{
        let continent  =  btn.dataset.selectedContinent;
        let filteredCOuntries = continent =="" ? Allcountries : Allcountries.then(countries=>
                            countries.filter(country=>country.continents.includes(continent))) ; 
        let input  = countriesInput.value ;  
        if(input != ""){
            filteredCOuntries = filteredCOuntries.then(countries=>
                countries.filter(country=>country.cca3.toLowerCase().includes(input.toLowerCase()) 
                || country.name.common.toLowerCase().includes(input.toLowerCase())
                ||country.name.official.toLowerCase().includes(input.toLowerCase()))) ; 
        }
        let list = countriesSearchList(filteredCOuntries) ;     
        list.then(countriesSearchItems => {
            if(countriesSearchItems == ""){
                contriesList.innerHTML = `  <div class="warning">
                                                <img src="${dead}" alt="not found" />
                                                <h4>your search did not match any results</h4>
                                            </div>
                                        ` ; 
                return ; 
            }
            contriesList.innerHTML = countriesSearchItems ; 
            setCountriesListeners() ; 
        })
        continentsBtns.forEach(btnReset=>{ 
            btnReset.classList.remove('selected') 
              if (btnReset.dataset.selectedContinent == continent) {
                btnReset.classList.add('selected') 
               };
        })
        
    })
})
countriesInput.addEventListener('keyup', ()=>{
    let input  =  countriesInput.value;
    let selectedContinent = document.querySelector('.continent-btn.selected').dataset.selectedContinent ; 
    
    let filteredCOuntries = Allcountries.then(countries=>
                        countries.filter(country=>(selectedContinent == "" || country.continents.includes(selectedContinent) ) && country.cca3.toLowerCase().includes(input.toLowerCase()) 
                        || country.name.common.toLowerCase().includes(input.toLowerCase())
                        ||country.name.official.toLowerCase().includes(input.toLowerCase()))) ; 

    let list = countriesSearchList(filteredCOuntries) ;     
    list.then(countriesSearchItems => {
        if(countriesSearchItems == ""){
            contriesList.innerHTML = `  <div class="warning">
                                            <img src="${dead}" alt="not found" />
                                            <h4>your search did not match any results</h4>
                                        </div>
                                    ` ; 
            return ; 
        }
        contriesList.innerHTML = countriesSearchItems ; 
        setCountriesListeners() ; 
    })
})

document.addEventListener('click',(event)=>{
    if(!aside.contains(event.target) && !aside.classList.contains('closed-aside') && !continentsCaroussel.contains(event.target)){
        aside.classList.add('closed-aside') ;
        closeSearchIcon.classList.add('hide') ; 
        searchIcon.classList.remove('hide') ;
    }
})

window.addEventListener('scroll',()=>{

    if(window.pageYOffset >=  66){
        aside.style.top=  "70px";
    }else{
        aside.style.top=  (70 + 60)+"px" ; 
    } 
})

controlIcons.addEventListener('click',()=>{
    aside.classList.toggle('closed-aside') ;
    closeSearchIcon.classList.toggle('hide') ; 
    searchIcon.classList.toggle('hide') ; 
    countriesInput.focus() ; 
})
CtnArrow.forEach(arrow=>arrow.addEventListener('click',()=>slideContinents(continentsList,arrow.dataset.arrowDirection)));




// functions

function slideContinents(list,direction){
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


function countriesSearchList(list){
   return list.then((countries) => {
    // console.log(countries[100]);
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

            displayCountry(country.dataset.countryName) ; 
            // infoMultiValueListeners() ;           
            countries.forEach(country=>country.classList.remove('selected'))
            country.classList.add('selected')
        })
    })
}

function displayCountry(countryName){
    Allcountries.then(countries=>{
        let {   name,flags,
                translations,
                languages,
                maps,latlng,capitalInfo,
                population,area,
                borders,gini ,
                capital,coatOfArms = "has no coat of armes",
                continents,currencies,
                idd,cca2,cca3,cioc,
                landlocked,independent,
                tld,unMember,timezones,
                subregion,status,
                startOfWeek,region,
                responseFulfiled = true
            } = countries.find(country => country.name.common  === countryName)?? {name: countryName , responseFulfiled : false} ; 
             let currenciesValues  =  currencies ? Object.values(currencies)  : null ; 
             let languagesValues  =  languages ? Object.values(languages)  : null ; 

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
                                                    <img src="${smallRightArrow}" class="right" alt="translations right arrow">
                                                    <img src="${smallLeftArrow}" class="left hide" alt="leftarrow">
                                                </div>
                                                <ul role="list" class="translations-list hide">
                                                </ul>
                                            
                                            </div>
                                    </div>

                                    <div class="region">
                                        <div class="info-group">
                                        ${countryInfoTasform("capital city" , capital)}
                                        </div>  
                                        <div class="info-group">
                                        ${countryInfoTasform("continent" , continents)}
                                        </div>
                                        <div class="info-group">
                                        ${countryInfoTasform("subregion" , subregion)}
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
                                    ${countryInfoTasform("language" , languagesValues )}
                                    </div>
                                    <div class="info-group">
                                    ${countryInfoTasform("currency" , TransformCurrency(currenciesValues))}
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">area</h3>
                                            <div class="info">
                                                <h3>${area}km<span class="sup">2</span></h3>
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
                                    ${countryInfoTasform("timezone" , timezones)}
                                    </div>
                                    <div class="info-group">
                                            <h3 class="label">start of week</h3>
                                            <div class="info">
                                                <h3>${startOfWeek}</h3>
                                            </div>
                                    </div>
                                    <div class="info-group">
                                    ${countryInfoTasform("top level domains" ,tld)}
                                    </div>
                                    <div class="info-group">
                                    ${countryInfoTasform("Gini index" ,joinKeyValue(gini))}
                                    </div>
                                    <div class="info-group">
                                    ${countryInfoTasform("dialing codes" ,TransformIdd(idd))}
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
                                                    <a href="${maps.googleMaps}" class="map-link" target="_blank">open in google maps <img src="${link}"  alt="link picture"></a>
                                                    <a href="${maps.openStreetMaps}" class="map-link" target="_blank">open in openStreetMaps <img src="${link}"  alt="link picture"></a>
                                                    <div id="mapid"></div>
                                                </div>
                                        </div>
                                        <div class="info-group">
                                                <h3 class="label">coat of armes</h3>
                                                <div class="info">
                                                ${coatArms(coatOfArms)}
                                                </div>
                                        </div>
                                        <div class="info-group">
                                                <h3 class="label">borders</h3>
                                                ${ bordersTransform(countries , borders) }  
                                        </div>
                                    </div>
    `; 
    applyCountryGeoJSON([ name.common , name.official ,cca2 , cca3, cioc],latlng)
    translationLanguagesList(translations, name.nativeName) ; 
    infoMultiValueListeners() ; 
    });
}

         
function infoMultiValueListeners(){
    let toggleValues = document.querySelectorAll('.toggle-values') ; 
        toggleValues.forEach(toggleElem=>{
            toggleElem.addEventListener('click',()=>{
            let btns  = toggleElem.childNodes ; 
                btns.forEach(btn=>{
                        if(btn.nodeName == "IMG"){
                            btn.classList.toggle('hide') ; 
                        }
                    })
                    let listItems = toggleElem.parentElement.nextElementSibling.childNodes ; 
                    listItems.forEach(item=>{ if(item.nodeName =="LI" && !item.classList.contains('first-element')){ item.classList.toggle('hide') }})
            })

        })
}   
function translationListListeners(translationElement , translations , native){
    let leftTransBtn =  document.querySelector('.translations-button .left') ; 
    let rightTransBtn =  document.querySelector('.translations-button .right') ; 

    document.querySelector('.translations-button').addEventListener('click',()=>{
        [translationElement,leftTransBtn,rightTransBtn].forEach(element=>{element.classList.toggle('hide')})
    })
    let selectedTranslationItem = document.querySelector('.translation-item.selected').dataset.languageCode ; 
    let {common , official} = translations[selectedTranslationItem] ?? native[selectedTranslationItem] ;
    document.querySelector('.seconadary-common-name').innerHTML = common;
    document.querySelector('.seconadary-official-name').innerHTML = official;
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
function translationLanguagesList( translations,nativeName = {}){
    let translationElement =  document.querySelector('.translations-list') ; 
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
     let promises = []
     translationElement.dataset.selectedTranslation= translationsCode[0] ; 
     translationsCode.forEach((code)=>{
         promises.push(languageInfo(code))
    }) ; 

     Promise.all(promises).then(responses=>{
         responses.forEach(((LangCodeToEng, index)=>{
                (index == 0)  ? selected ="selected" : selected ="" ; 
               translationElement.insertAdjacentHTML('beforeend', `<li class="translation-item ${selected}" data-language-code="${translationsCode[index]}">${LangCodeToEng}</li>`) ;

        }))
        translationListListeners(translationElement , translations , nativeName)
    });

}


function countryInfoTasform(label,info){
    if(!info){
        return `
        <h3 class="label">${label}</h3>
        <div class="info">
        <h3>has no ${label}</h3>
        </div>` ;  
    }else if(typeof info === 'object'){
        if (info.length == 1) {
            return `
            <h3 class="label">${label}</h3>
            <div class="info">
            <h3>${info[0]}</h3>
            </div>` ;             
        }
        if(info.length == 0){
            return `
            <h3 class="label">${label}</h3>
            <div class="info">
            <h3>has no ${label}</h3>
            </div>` ;   
        }
        let content = `<div class="label-group">
                            <h3 class="label">${label}<span style="text-transform:lowercase">(s)</span></h3>
                            <div class="toggle-values">
                                <img src="${plus}" alt="plus">
                                <img src="${minus}" class="hide" alt="minus">
                            </div>
                      </div>
                      <ul class="info initial">` ; 
            info.forEach((item,index)=>{
                let hide = index != 0 ? "hide" : "" ;
                let first = index == 0 ? "first-element" : "" ;
                content += `<li class="${first} ${hide}">
                                <h3>${item}</h3>
                            </li>
                            ` ; 
            })
            content += `</ul>` ; 
            return content ; 
        } else{
            return `
            <h3 class="label">${label}</h3>
            <div class="info">
            <h3>${info}</h3>
            </div>` ;
        }
}
function TransformIdd(idd){
    if(idd == undefined || idd == null  || !idd.root) { 
        return null 
    } 
    let Arr = [] ; 
    let root = idd.root ; 
    if(!idd.suffixes){ 
        Arr.push(`<span class="key">${root}</span>`) ;
    } else{     
        idd.suffixes.forEach((suffixe) => {
            Arr.push(`<span class="key">${root}</span>${suffixe}`) ;
        })
    }
    return Arr ; 
}
function TransformCurrency(currencies){
    if(currencies == undefined || currencies == null ) { 
        return currencies 
    } 
    let Arr = [] ; 
    currencies.forEach(({name,symbol}) => {
        Arr.push(`<span class="key">${symbol}</span> : ${name}`) ;
    })
    return Arr ; 
}
function joinKeyValue(keyvalue){
    if(keyvalue == undefined || keyvalue == null ) { 
        return keyvalue 
    } 
    let key  = Object.keys(keyvalue)
    let value = Object.values(keyvalue);
    return `<span class="key">${key}</span> : ${value}` ; 
}
function coatArms(coat){
    if(coat.png){
        return `<img src="${coat.png}" class="coat-armes" > `
    }
        return `<h3>has no coat of armes</h3>` ; 
}
function bordersTransform(countries,bordersCodes=[]){
let borders = countries.filter(country=>{
                                         if(bordersCodes.includes(country.cca3)) return true;
                                         if(bordersCodes.includes(country.cca2)) return true;
                                         if(bordersCodes.includes(country.ccn3)) return true;
                                         if(bordersCodes.includes(country.cioc)) return true; 
                                         return false ; 
                                        })
let html = `` ; 
    switch (borders.length) {
        case 0:
             html += `<div class="info"> 
                            <h3>has no borders</h3>
                      </div>` ; 
            break;
        case 1:
            html += `<div class="info initial"> 
                        <div class="tooltip">
                        <img src="${borders[0].flags.svg}" alt="${borders[0].name.common}" class="country-icon-img border-img" data-country-name="${borders[0].name.common}" />
                        <h3 class="tooltiptext">${borders[0].name.official}</h3>
                        </div>
                    </div>` ; 
            break;
    
        default:
                html += `<div class="info initial borders-info"> ` ; 
                borders.forEach(neighbor=> html+=`<div class="tooltip">
                                                    <img src="${neighbor.flags.svg}" alt="${neighbor.name.common}" class="country-icon-img border-img" data-country-name="${neighbor.name.common}" />  
                                                    <h3 class="tooltiptext">${neighbor.name.common}</h3>
                                                 </div> `  ) ; 
                html+=`</div>` ; 
            break;
    }
    return html;
}
