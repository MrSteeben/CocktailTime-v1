// Create namespace
const cocktailApp = {};

// Selector caching on the 'li' for better performance. 
cocktailApp.$li = $('li');

// Document ready function
$(function() {

    // Slow scroll from start to first slide
    $('.start').on('click', function() {
        $('html, body').animate({
            scrollTop: $(".mood").offset().top
        }, 
        'slow'
        );
    });
    cocktailApp.init();
})

//Determine user input
cocktailApp.eventListener = function() {

    cocktailApp.$li.on('click', function(e) {
        e.preventDefault();  

        // Store the selected drink the user 'clicked'
        let selectedDrink = $(this).attr('id');

        // Pass the user's clicked selection as a parameter to the function getDrinks()
        cocktailApp.getDrinks(selectedDrink);

        // Turn event listener off when drink type is selected to prevent further clicking
        // until the user selects the "try again" button at the bottom of the page
        cocktailApp.$li.off();

        $('html, body').animate({
            scrollTop: $(".results").offset().top
        }, 
        1500
        );
    })

}

// Receive the user's selected drink as a parameter and pass this value as data to our AJAX call
cocktailApp.getDrinks = function(selectedDrink) {
        
    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
        method: 'GET',
        dataType: 'json',
        data: {
            i: selectedDrink
        }
    }).then((res) => {

        // Pass the res from the AJAX call to the showResults() function to output 
        // the drinks Name and Photograph
        cocktailApp.showResults(res);
    })
}

// Retrieve user selection
cocktailApp.tryAgainListener = function(){

    $('.restart').on('click', function(){
        location.reload(true);
        $('html').scrollTop(0);
    });
}

// Receive results from the getDrinks AJAX call and randomize the user selection
cocktailApp.showResults = function(category) {
    // Randomize a drink with index number 
    const randomItem = Math.floor(Math.random() * (category.drinks).length);

    // Randomize a drink given random number
    // const randomDrink = category.drinks[randomItem].strDrink;

    // Obtain randomized drink image URL
    const randomDrinkImageUrl = category.drinks[randomItem].strDrinkThumb;

    // Obtain randomized drink ID
    const randomDrinkId = category.drinks[randomItem].idDrink;

    // Obtain randomized drink name
    const randomDrinkName = category.drinks[randomItem].strDrink;

    console.log(randomDrinkName);

    cocktailApp.getDrinkInstructions(randomDrinkId);

    $('.cocktailImgContainer').append(`<img class="cocktailImg" src="${randomDrinkImageUrl}" alt="${randomDrinkName} cocktail drink">`)
    $('.cocktailImgContainer').append(`<span class="cocktailImgText">${randomDrinkName}</span>`)

    cocktailApp.tryAgainListener();
    console.log(category.drinks[randomItem]);
}

// Receive the drink ID value for each drink generated and pass the id as data to the AJAX call
cocktailApp.getDrinkInstructions = function(randomDrinkId) {

    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php',
        method: 'GET',
        dataType: 'json',
        data: {
            i: randomDrinkId
        }
    }).then((res) => {
        // Pass the res of the AJAX call as a parameter to the instruction() function to extract the
        // Ingredients and Measurements and Mixing instructions for each drink
        cocktailApp.guideline(res);
    })
}


// Get the drink mixing ingredients, quantities and instructions on how to make the drink
cocktailApp.guideline = function(guide) {
    console.log(guide);
    // Empty array that hold the drink measurements
    const measures = [];
    // Empty array that hold the drink ingredients
    const ingredients = [];
    // Variable that holds the drink instructions
    const instructions = guide.drinks[0].strInstructions;
    

    console.log(instructions);
    //Create an array of all ingredients (excluding null values)
    for(let i = 1; i < 16; i++){
        const ingredientName = `strIngredient${i}`;
        const specificIngredient = guide.drinks[0][ingredientName];
        if (specificIngredient != null){
            ingredients.push(specificIngredient);
        }
    }
    //Create an array of all measurements (excluding null values)
    for(let i = 1; i < 16; i++){
        const measureName = `strMeasure${i}`;
        const specificMeasure = guide.drinks[0][measureName];
        if (specificMeasure != null){
            measures.push(specificMeasure);
        }
    }

    ingredients.forEach(function(items){
        $('.cocktailIngredients').append(`<span class="ingredients">${items}</span>`);
    })
    measures.forEach(function(items){
        $('.cocktailMeasures').append(`<span class="measure">${items}</span>`);
    })

    $('.cocktailInstructions').append(`<span class="instructions">${instructions}</span>`)
}


cocktailApp.init = function (){

    cocktailApp.eventListener();
    cocktailApp.getDrinks();
}


