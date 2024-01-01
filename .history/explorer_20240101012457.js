import countries from './components/sideCountriesList.js';

let data = countries()
data.then(coutries=>{countries.map(country=>console.log(country.name))});  