// const options = {
//     method: 'GET',
//     headers: {
//         'X-RapidAPI-Key': 'b534c0e408msh8635e573fab0c3bp101a7cjsn2335a157fc33',
//         'X-RapidAPI-Host': 'exerciseapi3.p.rapidapi.com'
//     }
// };

fetch('http://universities.hipolabs.com/search?name=middle&country=turkey')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));