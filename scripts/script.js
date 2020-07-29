// create namespace

// create an event listener for radio buttons to determine which mood is selected
// when mood is selected, load selected mood sub-categories
// create a function to store user's subcategory selection into a variable 
// pass the variable to a getDrinks function 
// in function getDrinks, call the api and pass in the data of the users sub-category selection

const cocktailApp = {}

const drinkCategory = {
    party: ['shot', 'milk%20/%20float%20/%20shake', 'punch%20/%20party%20drink'],
    chill: ['cocktail', 'beer', 'coffee%20/%20cocoa']
}

cocktailApp.init = function (){

}

// function ready
$(function() {

    cocktailApp.init();
    
})