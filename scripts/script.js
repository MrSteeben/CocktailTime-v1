// create namespace
const cocktailApp = {};

// Selector caching on the 'li' for better performance.  DO NOT REMOVE
cocktailApp.$li = $('li');


//DOC READY FUNCTION
$(function() {


     //Force scroll position to top at page refresh
    $('html, body').animate({scrollTop: 0}, 100);

    //Slow scroll from start to first slide
    $('.start').on('click', function() {
        $('html, body').animate({
            scrollTop: $(".questions").offset().top
        }, 
        'slow'
        );
    });


    cocktailApp.init();
})

cocktailApp.eventListener = function() {

    cocktailApp.$li.on('click', function(e){
        e.preventDefault();  

        // Store the selected drink the user 'clicked'
        let selectedDrink = $(this).attr('id');

        // a simple console log to see what the user clicked, REMOVE THIS AT END OF PROJECT!!!!
        console.log(selectedDrink);

        // Pass the user's clicked selection as a parameter to the function getDrinks()
        cocktailApp.getDrinks(selectedDrink);
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
    }).then((result) => {

        // pass the results from the AJAX call to the showResults() function to output the drinks Name and Photograph
        cocktailApp.showResults(result);

    })
}

// Receive the drink ID value for each drink generated and pass the id as data to the AJAX call
cocktailApp.getDrinkInstructions = function(drinkId) {

    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php',
        method: 'GET',
        dataType: 'json',
        data: {
            i: drinkId
        }
    }).then((result) => {
        // Pass the results of the AJAX call as a parameter to the instruction() function to extract the
        // Ingredients and Measurements and Mixing instructions for each drink
        cocktailApp.instruction(result);
    })
}

// get the drink mixing ingredients, quantities and instructions on how to make the drink
cocktailApp.instruction = function(instructions) {

    // Empty array that should hold the drink measurements (NOT SURE IF WE NEED THIS)
    const measurements = [];

    // Empty array that should hold the drink ingredients (NOT SURE IF WE NEED THIS)
    const ingredients = [];

    // loop through the drinkId array and extract the drink instructions, and eventually append to results
    // container
    Object.keys(instructions).forEach(function(items) {
        const drinkInfo = instructions[items];

        // store the instructions for the drink into a variable.  This information is stored at the FIRST array index[0]
        const drinkInstructions = drinkInfo[0].strInstructions;
        console.log(drinkInstructions);
        // console.log(drinkInfo[0].strIngredient1);


        // MY THINKING BEHIND THIS PART:
        // So if you look up a drinkId, it shows you strInstructions, but also it shows you
        // key value pairs for strIngrededient(1 to 15 fields), and strMeasure(1 to 15 fields).
        // Right now, we are looping through this array with a forEach, and this array is called instructions.
        // I can extract the instructions (strInstructions) on how to mix the drink.  BUT! I cannot figure out how to pull out
        // the values from the strIngredient and strMeasure properties.  Depending on the drink, the strIngredient and measurements vary.  For each drink ID we look at however, the strMeasure and strIngredient share the same number of properties.  A 1:1 ratio.  

        // What I can't figure out as well, is how do we loop through this array and store the values?  DO we store them
        // into a new array called measurements[] and ingredients[]?  If we push the strIngredient and strMeasurement values into an array, how the hell do we output these values to the results container into the matching drink?


        // THIS LOOP IS PROBABLY ENTIRELY WRONG -- I HATE MY LIFE
        // for (i = 1; i < drinkInfo.length; i++) {
        //     if (drinkInfo[0].strIngredient[i] != null) {
        //         measurements.push(drinkInfo[0].strIngredient[i]);
        //     } 
        // }
    })

}
cocktailApp.showResults = function(drink) {
    // console.log(drink);

    // loop through the an array of objects for random cocktails
    Object.keys(drink).forEach(function(items) {
        const showDrinks = drink[items];

        // loop 3 times to generate 3 random drinks and output to results container, for more images, increase i < 3 condition
        for (i = 0; i < 3; i++) {
            // get a random index from the drinks array
            const randomItem = Math.floor(Math.random() * showDrinks.length);

            // We can store the below console logs into variables and use those variables as string literals when outputting results, we did this method in a previous code along in bootcamp

            // This will get the drink name and store into variable
            const drinkName = showDrinks[randomItem].strDrink;
            console.log(drinkName);

            // This will get the thumbnail url
            const drinkImageUrl = showDrinks[randomItem].strDrinkThumb;
            console.log(drinkImageUrl);

            // This will get the drinks ID, so that we can pass that ID to a second AJAX call using the
            // appropriate URL for looking up specific details about a drink
            const drinkId = showDrinks[randomItem].idDrink;
            console.log(drinkId);

            // Call the getDrinkInstructions function and pass the drink ID to do an AJAX call
            cocktailApp.getDrinkInstructions(drinkId);

            // display the entire object
            // console.log(showDrinks[randomItem]);

        }

    })
}


cocktailApp.init = function (){

    cocktailApp.eventListener();
    cocktailApp.getDrinks();
}


