import './explorer.css'
import countries from './components/sideCountriesList.js';

let data = countries()
data.then(countries=>{countries.map(country=>console.log(country.name))});  