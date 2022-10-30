import { countryList } from './countries.js'

const countryInput = document.querySelector('.inputs_input--country')
const nameInput = document.querySelector('.inputs_input--name')
const searchButton = document.querySelector('.search_button')
const list = document.querySelector('.list')
const checkbox = document.querySelector('.search_toggle')
const checkboxLabel = document.querySelector('.checkbox_label')

let name = ''
let country = ''
let universites = []

const countries = function() {
    countryList.forEach(country => {
        let newCountry = document.createElement('option')
        newCountry.innerText = country
        country = newCountry.value
        countryInput.appendChild(newCountry)
    })
    console.log(countryInput.value)
    country = countryInput.value
}
countries()

const universities = function(array) {
    array.forEach(element => {
        let newRow = document.createElement('tr')
        let countryData = document.createElement('td')
        let nameData = document.createElement('td')
        let websiteData = document.createElement('td')
        let link = document.createElement('a')
        link.href = element.web_pages[0]
        link.target = '_blank'
        newRow.classList.add('list_row', 'data_row')
        let elements = [countryData, nameData, websiteData]
        elements.forEach(element => {
            element.classList.add('list_data')
        })
        countryData.innerText = element.country
        nameData.innerText = element.name
        link.innerText = element.web_pages[0]
        websiteData.appendChild(link)
        newRow.append(countryData, nameData, websiteData)
        list.appendChild(newRow)
    })
}

const toggleInput = function() {
    if (this.checked === true) {
        nameInput.disabled = false
        countryInput.disabled = true
        checkboxLabel.innerText = "Search by country"
        country = ''
    } else {
        nameInput.disabled = true
        countryInput.disabled = false
        country = countryInput.value
        checkboxLabel.innerText = "Search by name"
        name = ''
        nameInput.value = ''
    }
    console.log(countryInput.value)
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
                console.log(response)
                universites = response
                universities(universites)
            })
            .catch(err => console.error(err));
    } else {
        alert('Please fill name or country.')
    }
}

checkbox.addEventListener('click', toggleInput)
nameInput.addEventListener('input', handleInput)
countryInput.addEventListener('input', handleInput)
searchButton.addEventListener('click', showUniversities)