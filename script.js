import { countryList } from './countries.js'

const nameInput = document.querySelector('.inputs_input--name')
const searchButton = document.querySelector('.searchButton')
const countryInput = document.querySelector('.inputs_input--country')
const list = document.querySelector('.list')

let name = ''
let country = 'Afghanistan'
let universites = []

const countries = function() {
    countryList.forEach(country => {
        let newCountry = document.createElement('option')
        newCountry.innerText = country
        country = newCountry.value
        countryInput.appendChild(newCountry)
    })
}
countries()

const universities = function(array) {
    array.forEach(element => {
        console.log(element.name, element.country, element.domains[0])
        let newRow = document.createElement('tr')
        let countryData = document.createElement('td')
        let nameData = document.createElement('td')
        let websiteData = document.createElement('td')
        newRow.classList.add('list_row')
        countryData.classList.add('list_data')
        nameData.classList.add('list_data')
        websiteData.classList.add('list_data')
        countryData.innerText = element.country
        nameData.innerText = element.name
        websiteData.innerText = element.domains[0]
        newRow.appendChild(countryData)
        newRow.appendChild(nameData)
        newRow.appendChild(websiteData)
        list.appendChild(newRow)
    })

}
const handleInput = function(e) {
    if (e.target.type === 'select-one') {
        country = e.target.value
    }
    if (e.target.type === 'text') {
        name = e.target.value
    }
}

const showUniversities = function() {
    if (name !== '' || country !== '') {
        fetch(`http://universities.hipolabs.com/search?name=${name}&country=${country}`)
            .then(response => response.json())
            .then((response) => {
                universites = response
                universities(universites)
            })
            .catch(err => console.error(err));
    } else {
        console.log('Please fill name or country.')
    }
    universites = []
}

nameInput.addEventListener('input', handleInput)
countryInput.addEventListener('input', handleInput)
searchButton.addEventListener('click', showUniversities)