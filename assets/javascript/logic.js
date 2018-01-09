$(document).ready(function(){

/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBNsZu5ZuESxOse8NI3vQEieQcdhEx3Edg",
    authDomain: "trains-66820.firebaseapp.com",
    databaseURL: "https://trains-66820.firebaseio.com",
    projectId: "trains-66820",
    storageBucket: "",
    messagingSenderId: "237387956472"
  };

firebase.initializeApp(config);

var database = firebase.database();


// On Click event to store information from submission form and send to firebase
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var newTrain = $("#trainName-input").val().trim();
  var newDestination = $("#destination-input").val().trim();
  var newDeparture = $("#first-input").val().trim();
  var newFrequency = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var addTrain = {
    train: newTrain,
    destination: newDestination,
    departure: newDeparture,
    frequency: newFrequency
  };

  // Uploads train info to the database
  database.ref().push(addTrain);



  // console group log to test
  // console.group('new train schedule')
  // console.log(addTrain.train);
  // console.log(addTrain.destination);
  // console.log(addTrain.departure);
  // console.log(addTrain.frequency);
  // console.groupEnd();

  // Alert
  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");


});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

  console.log("Here's the childsnapshot");
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var newTrainA = childSnapshot.val().train;
  var newDestinationA = childSnapshot.val().destination;
  var newDepartureA = childSnapshot.val().departure;
  var newFrequencyA = childSnapshot.val().frequency;

  // Console group the new variables binding to the firebase data
/*  console.group("new snapshop vars")
  console.log(newTrainA);
  console.log(newDestinationA);
  console.log(newDepartureA);
  console.log(newFrequencyA);
  console.groupEnd();
*/

// Assumptions
    var tFrequency = newFrequencyA;

    // Time is 3:30 AM
    var firstTime = newDepartureA;

    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % tFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = tFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var nextTrainFinal = moment(nextTrain).format("hh:mm")


    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

// Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + newTrainA + "</td><td>" + newDestinationA + "</td><td>" +
  newFrequencyA + "</td><td>" + nextTrainFinal + "</td><td>" + tMinutesTillTrain + "</td></tr>");

});

});



















