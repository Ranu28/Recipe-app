const searchForm = document.querySelector('form');
const seachResult = document.querySelector('.search-result');
const container = document.querySelector('.container');
let searchQuery = '';


//api
const APP_ID = '4fd84ce4';
const APP_KEY = 'e76a4978df6020821da897cdbf4b3851';
// const baseURL = 'https://api.edamam.com/api/recipes/v2';


//geting input from search bar

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    searchQuery = event.target.querySelector('input').value;
    fetchAPI();
});

async function fetchAPI() {
    const baseURL = `https://api.edamam.com/search?q=${searchQuery}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
    // const baseURL = `https://api.edamam.com/api/recipes/v2?q=pizza&app_id=${APP_ID}&app_key=${APP_KEY}`;
    const response = await fetch(baseURL);
    const data = await response.json();
    generateHTML(data.hits);
    console.log(data);
}

function generateHTML(results) {
    container.classList.remove('initial');
    let generatedHTML = '';
    results.map(result => {
        generatedHTML +=
            `<div class="item">
        <img src="${result.recipe.image}" alt="">
        <div class="flex-container">
            <h1 class="title">${result.recipe.label}</h1>
            <a class="view-button" href="${result.recipe.url}" target="_blank">View Recipe</a>
        </div>
        <p class="item-data">Caloies: ${result.recipe.calories.toFixed(2)}</p>
        <p class="item-data">Diet label: ${result.recipe.dietLabels.length > 0 ? result.recipe.dietLabels:'No data found'}</p>
        <p class="item-data">Health Label: ${result.recipe.healthLabels}</p>
        </div>`
    });
    seachResult.innerHTML = generatedHTML;
}