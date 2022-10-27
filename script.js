import { countryList } from './countries.js'

const nameInput = document.querySelector('.inputs_input--name')
const searchButton = document.querySelector('.searchButton')
const countryInput = document.querySelector('.inputs_input--country')

let name = ''
let country = ''



const countries = function() {
    console.log(countryInput.innerHTML)
    countryList.forEach(country => {
        let newCountry = document.createElement('option')
        newCountry.innerText = country
        newCountry.value = country
        countryInput.appendChild(newCountry)
    })
}

countries()
const handleInput = function(e) {
    console.log(e.target.value)
}

const showUniversities = function() {
    if (name !== '' || country !== '') {
        fetch(`http://universities.hipolabs.com/search?name=${name}&country=${country}`)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
    } else {
        console.log('Please fill name or country.')
    }
    name = ''
    country = ''
}

nameInput.addEventListener('input', handleInput)
countryInput.addEventListener('input', handleInput)
searchButton.addEventListener('click', showUniversities)