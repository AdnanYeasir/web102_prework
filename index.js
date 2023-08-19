/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import games from './games.js';
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA);

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {

    console.log(games)
    // loop over each item in the data
    for (let i = 0; i < games.length; i++) {
        // const game = games[i];
      

        // create a new div element, which will become the game card
        let gameCard = document.createElement('div')
        

        // add the class game-card to the list
        gameCard.className = 'game-card';
        gameCard.classList.add('game-card')
        document.getElementById('games-container').appendChild(gameCard);
  
        // set the inner HTML using a template literal to display some info 
        gameCard.innerHTML = `
        <img class="game-img" src="${games[i].img}" alt="${games[i].name}">
        <h2>${games[i].name}</h2>
        <p>${games[i].description}</p>
        <p>Pledged: $${games[i].pledged}</p>
        <p>Backers: ${games[i].backers}</p>
    `;
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container
        gamesContainer.appendChild(gameCard)
    }
}

// call the function we just defined using the correct variable
addGamesToPage(GAMES_JSON);
// later, we'll call this function using a different list of games


/*************************************************************************************
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/




// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");

// use reduce() to count the number of total contributions by summing the backers
const totalcontribution = GAMES_JSON.reduce((total, game) => {
    return total + game.backers
},0);

// set the inner HTML using a template literal and toLocaleString to get a number with commas
contributionsCard.innerText = totalcontribution;

// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");

const totalRaised = GAMES_JSON.reduce((total, game) => {
    return total + game.pledged
}, 0);
raisedCard.innerText = "$" + totalRaised.toLocaleString();
// set inner HTML using template literal

// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");


gamesCard.innerText = GAMES_JSON.length
/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * 
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have not yet met their goal
    const unfundedGames = GAMES_JSON.filter((games) => {
       return games.pledged < games.goal
    });
  
    // use the function we previously created to add the unfunded games to the DOM
    addGamesToPage(unfundedGames);

    //console.log("Number of unfunded games:", unfundedGames.length);
}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);

    // use filter() to get a list of games that have met or exceeded their goal
    const fundedGames = GAMES_JSON.filter(game => game.pledged >= game.goal);

    // use the function we previously created to add the funded games to the DOM
    addGamesToPage(fundedGames);
}

// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);

    // add all games from the JSON data to the DOM
    addGamesToPage(GAMES_JSON)
}

// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");
unfundedBtn.addEventListener("click", filterUnfundedOnly);
fundedBtn.addEventListener("click", filterFundedOnly);
allBtn.addEventListener("click",showAllGames)// add event listeners with the correct functions to each button


/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const countunfundedGames = GAMES_JSON.filter((games) => {
    return (games.pledged < games.goal).length
 });

// create a string that explains the number of unfunded games using the ternary operator

const displayStr = `A total of $${totalRaised.toLocaleString()} has been raised for ${GAMES_JSON.length} games. Currently ${countunfundedGames} game${countunfundedGames === 1 ? '' : 's'} remain${countunfundedGames === 1 ? '' : 's'} unfunded. We need your help to fund these amazing games!`;

// create a new DOM element containing the template string and append it to the description container
const infoParagraph = document.createElement('p');
infoParagraph.textContent = displayStr; // Corrected this line
descriptionContainer.appendChild(infoParagraph);
/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */

const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

// use destructuring and the spread operator to grab the first and second games
const [first, second, ...remainingGames] = sortedGames

// create a new element to hold the name of the top pledge game, then append it to the correct element
const topGame = sortedGames[0];
const secondTopGame = sortedGames[1];

// Create elements for the top funded game
const topGameNameElement = document.createElement("h4");
topGameNameElement.textContent = "🥇 " + topGame.name;

// Append the top game element to the firstGameContainer
firstGameContainer.appendChild(topGameNameElement);

// Create elements for the second most funded game
const secondTopGameNameElement = document.createElement("h4");
secondTopGameNameElement.textContent = "🥈 " + secondTopGame.name;

// Append the second top game element to the secondGameContainer
secondGameContainer.appendChild(secondTopGameNameElement);


// do the same for the runner up item