import countries from './components/sideCountriesList.js';

let data = countries()
data.then(coutries=>{
    country=>console.log(country.name)});  