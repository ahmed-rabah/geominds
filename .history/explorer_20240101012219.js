import countries from './components/sideCountriesList.js';

let data = countries()
data.forEach(country=>console.log(country.name))  