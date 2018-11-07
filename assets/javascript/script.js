var topics = [];

$(document).ready(function() {



$(document.body).on("click", ".postButtons", function() {
  console.log(this)
  var search = $(this).attr("data-name");
  // var search = value typed into search bar
  var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=BiyOuEK8uP69gAf16T8QeA1U1T3CzszG&q=${search}&limit=10`;

  // Creates AJAX call for the specific topic button being clicked
  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(res) {
    var results = res.data
    console.log(results)
    $("#gif-section").empty();
    for (var i = 0; i < results.length; i++) {

      var newDiv = $("<div>");
      // results[i].rating;
      var p = $("<p>").text("Rating: "+ results[i].rating);
      var newImg = $("<img>");
      newImg.attr("src", results[i].images.fixed_height_still.url);
      newDiv.append(p);
      newDiv.append(newImg);
      $("#gif-section").prepend(newDiv);

      console.log("working?")

    }
  })

});


// function displayGifs() {
//   var topic = $(this).attr("data-name");
//   $("#gif-section").empty()
//
//   // var search = value typed into search bar
//   var queryURL = `https://api.giphy.com/v1/gifs/search?api_key=BiyOuEK8uP69gAf16T8QeA1U1T3CzszG&q=${topics}&limit=10`;
//
//   // Creates AJAX call for the specific topic button being clicked
//   $.ajax({
//     url: queryURL,
//     method: "GET"
//   }).then(function(res) {
//     var results = res.data
//     for (var i = 0; i < results.length; i++) {
//       console.log(results)
//       console.log(results.length)
//       newDiv = $("<div>")
//       newImg = $("<img>")
//       divImg = newDiv.append(newImg)
//       // var ratings = results[i].rating
//       var stillURL = results[i].images.fixed_height_still.url
//       newImg
//         .attr({
//           src: stillURL,
//           id: "format-div"
//         })
//       // $("#gif-section").append(`rating:${ratings}`)
//       $("#gif-section").append(divImg)
//
//     }
//   });
//
//
// }

function renderButtons() {
  $("#buttonsDiv").empty();
  for (var i = 0; i < topics.length; i++) {
    // this will assign new buttons to the variable b
    var b = $("<button>");
    // adding a class to match the pre-buttons
    b.addClass("postButtons")
    // adds a data attribute

    b.attr("data-name", topics[i]);
    // provide the button text
    b.text(topics[i]);
    // Added the button to the buttons-view div
    $("#buttonsDiv").append(b);

  }
}


$("#topic-submit").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val().trim();
  // topics.empty();
  // The topic from the textbox is then added to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topics array
  renderButtons();

  //removes the text from the topic box
  $("#topic-input").val("")

});

// Calling the renderButtons function to display the initial buttons

renderButtons();
// Adding click event listeners to all elements with a class of "postButtons"


$(document).on("click", ".postButtons", function() {

});

})
// displayGifs();
