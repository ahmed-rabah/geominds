let Allcountries = getCountries();

export  async function getCountries(){
    try {
        let response = await fetch('https://restcountries.com/v3.1/all')
        let data= await response.json() ; 
        return data ; 
    } catch (error) {
        console.error(error) ;
        return ; 
    }
}

export function countriesSearchList(list){
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

export  function setCountriesListeners(){
    let countries =  document.querySelectorAll('.country-search-group') ; 

    countries.forEach(country => {
        country.addEventListener("click",()=>{

            displayCountry(country.dataset.countryName);
        })
    })
}

function displayCountry(countryName){
    Allcountries.then(countries=>{
         return {name,flags,translations,languages,maps,population,area,borders,capital,coatOfArms,continents,currencies,isoCode,idd:{root},landlocked,independent,tld,unMember , timezones , subregion , status  , startOfWeek , region} =countries.filter(country => country.name.common  === countryName)[0] ; 
    });
}

