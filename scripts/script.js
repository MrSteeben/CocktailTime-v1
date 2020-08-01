
// create namespace
const cocktailApp = {};

// Selector caching on the 'li' for better performance.  DO NOT REMOVE
cocktailApp.$li = $('li');


//DOC READY FUNCTION
$(function() {

    //Slow scroll from start to first slide
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

    cocktailApp.$li.on('click', function(e){
        e.preventDefault();  

        // Store the selected drink the user 'clicked'
        let selectedDrink = $(this).attr('id');

        // a simple console log to see what the user clicked, REMOVE THIS AT END OF PROJECT!!!!
        console.log(selectedDrink);

        // Pass the user's clicked selection as a parameter to the function getDrinks()
        cocktailApp.getDrinks(selectedDrink);

        cocktailApp.$li.off();

        $('html, body').animate({
            scrollTop: $(".results").offset().top
        }, 
        'slow'
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

        // pass the res from the AJAX call to the showResults() function to output the drinks Name and Photograph
        cocktailApp.showResults(res);

    })
}

//Retrieve user selection

cocktailApp.tryAgainListener = function(){

    $('.restart').on('click', function(){
        location.reload(true);
        $('html, body').animate({scrollTop: 0}, 100);
    });
}


cocktailApp.showResults = function(category) {
    //randomize a drink with index number 
    const randomItem = Math.floor(Math.random() * (category.drinks).length);

    //randomize a drink given random number
    const randomDrink = category.drinks[randomItem].strDrink;

    //obtain randomized drink image URL
    const randomDrinkImageUrl = category.drinks[randomItem].strDrinkThumb;

    //obtain randomized drink ID
    const randomDrinkId = category.drinks[randomItem].idDrink;

    cocktailApp.getDrinkInstructions(randomDrinkId);

    $('.cocktailImgContainer').append(`<img class="cocktailImg" src=${randomDrinkImageUrl}>`)

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


// get the drink mixing ingredients, quantities and instructions on how to make the drink
cocktailApp.guideline = function(guide) {
    console.log(guide);
    // Empty array that hold the drink measurements
    const measures = [];
    // Empty array that hold the drink ingredients
    const ingredients = [];
    //Variable that holds the drink instructions
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
        $('.cocktailIngredients').append(`<li class="ingredients">${items}</li>`);
    })
    measures.forEach(function(items){
        $('.cocktailMeasures').append(`<li class="measure">${items}</li>`);
    })

    $('.cocktailInstructions').append(`<li class="instructions">${instructions}</li>`)
}


cocktailApp.init = function (){

    cocktailApp.eventListener();
    cocktailApp.getDrinks();
}


