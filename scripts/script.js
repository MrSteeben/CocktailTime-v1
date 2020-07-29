// create namespace

// create an event listener for radio buttons to determine which mood is selected
// when mood is selected, load selected mood sub-categories
// create a function to store user's subcategory selection into a variable 
// pass the variable to a getDrinks function 
// in function getDrinks, call the api and pass in the data of the users sub-category selection

<<<<<<< HEAD
const cocktailApp = {
    party :[ 
        milk = {
            idDrink
        }
        
        float: [

        ]
    ]
}
=======
const cocktailApp = {};
>>>>>>> 6d62d5a3fd37113e0bc39f9d922bda1cd5a3826f

const drinkCategory = {
    party: ['shot', 'milk / float / shake', 'punch / party drink'],
    chill: ['cocktail', 'beer', 'coffee / cocoa'],
    random: ['']
}

<<<<<<< HEAD
// function ready
=======
cocktailApp.getDrinks = function() {
        
    $.ajax({
        url: 'https://www.thecocktaildb.com/api/json/v1/1/filter.php',
        method: 'GET',
        dataType: 'json',
        data: {
            c: 'milk / float / shake'
        }
    }).then((result) => {

        cocktailApp.showResults(result);

    })
}

cocktailApp.showResults = function(drink) {
    // console.log(drink);

    // loop through the an array of objects for random cocktails
    Object.keys(drink).forEach(function(items) {
        const showDrinks = drink[items];

        // console.log(showDrinks[2]);

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

            // display the entire object
            // console.log(showDrinks[randomItem]);

        }
    })
}

>>>>>>> 6d62d5a3fd37113e0bc39f9d922bda1cd5a3826f
$(function() {
    cocktailApp.getDrinks();

<<<<<<< HEAD
    cocktailApp.init();
    
})

cocktailApp.init = function (){

}

=======
})
>>>>>>> 6d62d5a3fd37113e0bc39f9d922bda1cd5a3826f
