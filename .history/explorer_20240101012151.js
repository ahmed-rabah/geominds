import countries from './components/sideCountriesList.js';

let data = countries()
data.map(country=>console.log(country.name))  