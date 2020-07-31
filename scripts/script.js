// create namespace

// create an event listener for radio buttons to determine which mood is selected
// when mood is selected, load selected mood sub-categories
// create a function to store user's subcategory selection into a variable 
// pass the variable to a getDrinks function 
// in function getDrinks, call the api and pass in the data of the users sub-category selection

const cocktailApp = {};
const drinkKeyUrl = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php';
const instructionsKey = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php';

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

        let selectedDrink = $(this).attr('id');
        
        console.log(selectedDrink);
        // const selectedDrink = vodka;
        cocktailApp.getDrinks(drinkKeyUrl, selectedDrink);
    })

}
cocktailApp.getDrinks = function(drinksUrl, selectedDrink) {
        
    $.ajax({
        url: drinksUrl,
        method: 'GET',
        dataType: 'json',
        data: {
            i: selectedDrink
        }
    }).then((result) => {

        cocktailApp.showResults(result);

    })
}

cocktailApp.getDrinkInstructions = function(drinkId) {

    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php',
        method: 'GET',
        dataType: 'json',
        data: {
            i: drinkId
        }
    }).then((result) => {
        cocktailApp.instruction(result);
    })
}

// get the drink mixing ingredients and instructions
cocktailApp.instruction = function(instructions) {

    Object.keys(instructions).forEach(function(items) {
        const drinkInfo = instructions[items];

        const drinkInstructions = drinkInfo[0].strInstructions;
        console.log(drinkInstructions);

        
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
            // console.log(randomItem);

            // We can store the below console logs into variables and use those variables as string literals when outputting results, we did this method in a previous code along in bootcamp

            // This will get the drink name and store into variable
            const drinkName = showDrinks[randomItem].strDrink;
            console.log(drinkName);

            // This will get the thumbnail url
            const drinkImageUrl = showDrinks[randomItem].strDrinkThumb;
            console.log(drinkImageUrl);

            const drinkId = showDrinks[randomItem].idDrink;
            console.log(drinkId);

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


