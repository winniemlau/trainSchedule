
// 1. Link to Firebase
var trainData = new Firebase("https://trainschdule.firebaseio.com/");

// 2. Populate Firebase Database with initial data

// 3. Button for adding trains
$("#addTrainBtn").on("click", function(){

	// Grabs user input
	var trainName = $("#trainNameInput").val().trim();
	var destination = $("#destinationInput").val().trim();
	var firstTrainUnix = moment($("#firstTrainInput").val().trim(), "HH:mm").subtract(10, "years").format("X");
	var frequency = $("#frequencyInput").val().trim();

	// Creates local "temporary" object for holding train data
	var newTrain = {
		name:  trainName,
		destination: destination,
		firstTrain: firstTrainUnix,
		frequency: frequency
	}

	// Uploads train data to the database
	trainData.push(newTrain);

	// Logs everything to console
	console.log(newTrain.name);
	console.log(newTrain.destination);
	console.log(firstTrainUnix);
	console.log(newTrain.frequency)

	// Alert
	alert("Train successfully added");

	// Clears all of the text-boxes
	$("#trainNameInput").val("");
	$("#destinationInput").val("");
	$("#firstTrainInput").val("");
	$("#frequencyInput").val("");

	// Determine when the next train arrives.
	return false;
});


// 4. Create Firebase event for adding trains to the database and a row in the html when a user adds an entry
trainData.on("child_added", function(childSnapshot, prevChildKey){

	console.log(childSnapshot.val());

	// Store everything into a variable.
	var tName = childSnapshot.val().name;
	var tDestination = childSnapshot.val().destination;
	var tFrequency = childSnapshot.val().frequency;
	var tFirstTrain = childSnapshot.val().firstTrain;

	// Calculate the minutes until arrival using hardcore math
	// To calculate the minutes till arrival, take the current time in unix subtract the FirstTrain time and find the modulus between the difference and the frequency
	var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes");
	var tRemainder = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
	var tMinutes = tFrequency - tRemainder;

	// To calculate the arrival time, add the tMinutes to the currrent time
	var tArrival = moment().add(tMinutes, "m").format("hh:mm A");
	console.log(tMinutes);
	console.log(tArrival);

	console.log(moment().format("hh:mm A"));
	console.log(tArrival);
	console.log(moment().format("X"));

	// Add each train's data into the table
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");

});
