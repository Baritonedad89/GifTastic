var topics = [];

function displayGifs() {
  var topic = $(this).attr("data-name");

  // var search = value typed into search bar
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=BiyOuEK8uP69gAf16T8QeA1U1T3CzszG&q=${topics}&limit=10`;

  // Creates AJAX call for the specific movie button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(res) {
    var results = res.data

    console.log(res)
    //   newImg = $("<img>")
    //   var stillURL = res.data[4].images.fixed_height_still.url
    //   newImg.attr("src", stillURL)
    // $("#gif-section").append(newImg)

  });


}

function renderButtons() {
  $("#gif-section").empty();
  for (var i = 0; i < topics.length; i++) {
    // this will assign new buttons to the variable b
    var b = $("<button>");
    // adding a class to match the pre-buttons
    b.addClass("postButtons")
    // adds a data attribute
    // b.attr("data-name", topics[i]);
    // provide the button text
    b.text(topics[i]);
    // Added the button to the buttons-view div
    $("#gif-section").append(b);
  }
}


$("#topic-submit").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val().trim();
  // The movie from the textbox is then added to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our movie array
  renderButtons();
});

// Calling the renderButtons function to display the intial buttons

renderButtons();
// Adding click event listeners to all elements with a class of "movie"

$(document).on("click", ".postButtons", displayGifs);









displayGifs();
