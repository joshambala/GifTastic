// create an array of animals
var animals = ["Dog", "Car", "Bird", "Fish", "Rabbit", "Hamster", "Squirrel", "Mouse", "Turtle", "Frog", "Lizard", "Tiger", "Kangaroo", "Bear", "Deer"];

// creates buttons for each of these
function makeButtons(){
	// deletes the animals prior to adding new animals so there are no repeat buttons
	$('#buttonsView').empty();
	// loops through the animals array
	for (var i = 0; i < animals.length; i++){
		// dynamically makes buttons for every animal in the array
		var a = $('<button>')
		a.addClass('animal'); // add a class
		a.attr('data-name', animals[i]); // add a data-attribute
		a.text(animals[i]); // make button text
		$('#buttonsView').append(a); // append the button to buttonsView div
	}
}

// handles addAnimal button event
$("#addAnimal").on("click", function(){

	// grabs the user show input
	var animal = $("#animal-input").val().trim();
	// that input is now added to the array
	animals.push(animal);
	// the makeButtons function is called, which makes buttons for all my animals plus the user animal
	makeButtons();
	// this line is so users can hit "enter" instead of clicking the submit button
	return false;
})

// function to display gifs
function displayGifs(){
	var animal = $(this).attr("data-name");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&limit=9&api_key=dc6zaTOxFJmzC";

		// creates ajax call
		$.ajax({url: queryURL, method: "GET"}).done(function (response) {
			console.log(response.data);
			// save results as a variable
			var results = response.data;
			// for loop goes through each gif and adds these variables
			for (var i = 0; i < results.length; i++) {
				// creates a generic div to hold the results
				var gifDiv = $('<div class=gifs>');
				var animalGif = $('<img>');
					animalGif.attr('src', results[i].images.fixed_height_still.url);
					// shows the rating on hover
					animalGif.attr('title', "Rating: " + results[i].rating);
					animalGif.attr('data-still', results[i].images.fixed_height_still.url);
					animalGif.attr('data-state', 'still');
					animalGif.addClass('gif');
					animalGif.attr('data-animate', results[i].images.fixed_height.url);
				// var rating = results[i].rating;
				// var p = $('<p>').text('Rating: ' + rating);
				gifDiv.append(animalGif)
				// gifDiv.append(p)

				$("#gifsView").prepend(gifDiv);
			}

		});
}

// function for animating gifs
$(document).on('click', '.gif', function(){
	var state = $(this).attr('data-state');
		if ( state == 'still'){
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }else{
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            };
});



// function for displaying animal gifs
$(document).on("click", ".animal", displayGifs);

// initially calls the makeButtons function
makeButtons();