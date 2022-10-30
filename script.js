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
        let newRow = document.createElement('tr')
        let countryData = document.createElement('td')
        let nameData = document.createElement('td')
        let websiteData = document.createElement('td')
        newRow.classList.add('list_row', 'data_row')
        let elements = [countryData, nameData, websiteData]
        elements.forEach(element => {
            element.classList.add('list_data')
        })
        countryData.innerText = element.country
        nameData.innerText = element.name
        websiteData.innerText = element.domains[0]
        newRow.append(countryData, nameData, websiteData)
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
    let rows = document.querySelectorAll('.data_row')
    rows.forEach(row => {
        row.remove()
    })
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

}

nameInput.addEventListener('input', handleInput)
countryInput.addEventListener('input', handleInput)
searchButton.addEventListener('click', showUniversities)