// create namespace

// create an event listener for radio buttons to determine which mood is selected
// when mood is selected, load selected mood sub-categories
// create a function to store user's subcategory selection into a variable 
// pass the variable to a getDrinks function 
// in function getDrinks, call the api and pass in the data of the users sub-category selection

const cocktailApp = {};

cocktailApp.party = {
    shot: [
        {
            title: 'shot',
            imageURL: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/shots.jpg);'
        }
    ],
    punch: [
        {
            title: 'punch / party drink',
            imageUrl: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/punch.jpg);"
        }
    ],
    float: [
      {
        title: 'float',
        imageURL: 'linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/float.jpg);'
      }
    ],
    chill: [
        {
            title: 'cocktail', 
            imageURL: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/cocktail.jpg);",
        },
        {
            title: 'beer',
            imageURL: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/beer.jpg);",
        },
        {
            title: 'coffee / cocoa',
            imageURL: "linear-gradient(rgba(255,255,255,0.5), rgba(255,255,255,0.5)),url(../../assets/coffee.jpg);",
        }
    ],

    random: [
        {
            key: "",
        }
    ],
}

//DISPLAY SUBCATEGORY BASED OFF OF USER CATEGORY SELECTION
//DOC READY FUNCTION
$(function() {
    function randomItem(optionsArray) {
		const index = Math.floor(Math.random() * optionsArray.length);
		return optionsArray[index];
    }

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

    //USER CLICKS READY
    cocktailApp.getSelection = function(){
    $('.form').on('start', function(event){
        event.preventDefault();
        //Figure out which category user chooses
        const mood = $('input[name=mood]:checked').val();
        console.log(mood);
        const userMood = cocktailApp.party[mood];

        //Dependent on category chosen, display images on subcategories
        if (userMood === 'party'){
            $(".category1").css("background", userMood[party].imageURL) && 
            $(".category2").css("background", userMood[party].imageURL) && 
            $(".category3").css("background", userMood[party].imageURL)
        } else if (userMood === 'chill'){
            $(".category1").css("background", userMood[chill].imageURL) && 
            $(".category2").css("background", userMood[chill].imageURL) && 
            $(".category3").css("background", userMood[chill].imageURL)
        } else if (userMood === 'surprise'){
            $('html, body').animate({
                scrollBot: $("footer").offset().top
            }, 
            'slow');
        }
    })
};   
    cocktailApp.init();
})

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



cocktailApp.init = function (){
    cocktailApp.getSelection();
    cocktailApp.getDrinks();
}


