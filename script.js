import { countryList } from './countries.js'

fetch('http://universities.hipolabs.com/search?name=&country=')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));

console.log(countryList)