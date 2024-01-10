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

            displayCountry(country.dataset.countryName) ; 
            // infoMultiValueListeners() ;           

        })
    })
}

function displayCountry(countryName){
    Allcountries.then(countries=>{
        let {   name,flags,
                translations,
                languages,
                maps,population,
                area,borders,gini ,
                capital,coatOfArms = "has no coat of armes",
                continents,currencies,
                idd,
                landlocked,independent,
                tld,unMember,timezones,
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
                                                    <img src="./images/small-right-arrow.svg" class="right" alt="translations right arrow">
                                                    <img src="./images/small-left-arrow.svg" class="left hide" alt="leftarrow">
                                                </div>
                                                ${translationLanguagesList(translations,name.nativeName)}
                                            
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
                                    ${countryInfoTasform("language" , Object.values(languages))}
                                    </div>
                                    <div class="info-group">
                                    ${countryInfoTasform("currency" , TransformCurrency(Object.values(currencies)))}
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
                                                    <h3>${maps}</h3>
                                                </div>
                                        </div>
                                        <div class="info-group">
                                                <h3 class="label">coat of armes</h3>
                                                <div class="info">
                                                    <img src="${coatOfArms.svg}" >
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
    infoMultiValueListeners() ; 
    });
}
function TransformIdd(idd){
    if(idd == undefined || idd == null ) { 
        return idd 
    } 
    let Arr = [] ; 
    let root = idd.root ; 
    idd.suffixes.forEach((suffixe) => {
        Arr.push(`<span class="key">${root}</span>${suffixe}`) ;
    })
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
function countryInfoTasform(label,info){
    if(typeof info === 'object'){
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
                                <img src="./images/plus.png" alt="plus">
                                <img src="./images/minus.png" class="hide" alt="minus">
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
        }else if(!info){
            return `
            <h3 class="label">${label}</h3>
            <div class="info">
            <h3>has no ${label}</h3>
            </div>` ;  
        }else{
            return `
            <h3 class="label">${label}</h3>
            <div class="info">
            <h3>${info}</h3>
            </div>` ;
        }
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

         
function infoMultiValueListeners(){
    let toggleValues = document.querySelectorAll('.toggle-values') ; 
    // elem.addEventListener('click',()=>{
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