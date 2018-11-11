var topics = ["Cardi B", "Lil Yachty","Kayne West", "Jay-z","The Migos", "T.I.", "Drake", "Eminem", "Kendrick Lamar", "J.Cole", "Lucas Joyner", "Travis Scott", "Post Malone", "Juice WRLD", "ASAP Rocky", "Logic", "Childish Gambino", "Nicki Minaj"];

$(document).ready(function() {


// on click that runs Giphy API
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
      var p = $("<p>").html(`<span id="rating">Rating: ${results[i].rating}</span>&nbsp;&nbsp<button class="download" download-data="${results[i].images.looping.mp4}">download</button>&nbsp;&nbsp;&nbsp;&nbsp`);
// initial src attribute to the still image
      var newImg = $("<img class='full'>").attr("src",results[i].images.fixed_height_still.url);

          newImg.attr("data-still", results[i].images.fixed_height_still.url);
          // data state of 'still' to use as a reference of the state
          newImg.attr("data-animate", results[i].images.fixed_height.url);
// data state of 'still' to use as a reference of the state
          newImg.attr("data-state", "still");

      p.attr("id", "format-controls")
      newDiv.append(p);
      newDiv.append(newImg);
      $("#gif-section").prepend(newDiv);
}

  })

});

// I hoped to make a youtube api so that videos would play when a button was pressed button
// couldn't get it to work. 
// function givePlaySongButtonData(){
//   for (var i = 0; i < topics.length; i++){
//     // var iframe = $("<iframe>");
//     var names = topics[i];
//     var playsongs = $("#playSong")
//   playsongs.attr("data-name", topics[i]);
//   // $("#playSong").append(iframe);
//   }
// }

// function that forces the download button to work
function forceDownload(url) {
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url, true);
       xhr.responseType = "blob";
       xhr.onload = function () {
           var urlCreator = window.URL || window.webkitURL;
           var imageUrl = urlCreator.createObjectURL(this.response);
           var tag = document.createElement('a');
           tag.href = imageUrl;
           tag.download = "";
           document.body.appendChild(tag);
           tag.click();
           document.body.removeChild(tag);
       }
       xhr.send();
   }

// on click function that gets the download button to work
   $(document).on("click", ".download", function () {
      var url = $(this).attr('download-data')
      forceDownload(url)
   })



// function to create the buttons
function renderButtons() {
  $("#buttonsDiv").empty();
  for (var i = 0; i < topics.length; i++) {
    // this will assign new buttons to the variable b
    var b = $("<button>");
    // adding a class to match the pre-buttons
    b.addClass("postButtons")
    // adds a data name attribute to use as the search criteria in the ajax url
    b.attr("data-name", topics[i]);
    // provide the button text
    b.text(topics[i]);
    // Adds the button to the buttons-view div
    $("#buttonsDiv").append(b);
  }
}

// submit button event click
$("#topic-submit").on("click", function(event) {
  event.preventDefault();
  // This line of code will grab the input from the textbox
  var topic = $("#topic-input").val().trim();
  // The topic from the textbox is then added to our array
  topics.push(topic);

  // Calling renderButtons which handles the processing of our topics array

  //removes the visual text from the topic box
  $("#topic-input").val("")
  // I wanted to make a rule where if the value of the search box is empty then don't render any buttons but it doesn't work
// if ($("#topic-input").val().length == 0) {
//   $("#topic-submit").attr('disabled', true;
// } else {
//   $("#topic-submit").attr('disabled', false);
// }
renderButtons();

});

// Calling the renderButtons function to display the initial buttons
renderButtons();

// because these elements aren't initially loaded onto the DOM at page loaded
// I have to trigger these click events on the document once the img tags are
// available
$(document).on("click", "img", function() {
  // the variable state is equal to the data state that is initially set
var state = $(this).attr("data-state");
// if state is equal to still, which it is initially do something
if (state === "still") {
  // change the current src to the animate url
  $(this).attr("src", $(this).attr("data-animate"));
  // change the current state to animate
  $(this).attr("data-state", "animate");
  // else if the state is anything other than still, which could only be animate
  // because I've only set two states (still and animate) then do something
} else {
  // change src to the still url
  $(this).attr("src", $(this).attr("data-still"));
  // change the state to still
  $(this).attr("data-state", "still");
}


});


// document.ready closing bracket
})
