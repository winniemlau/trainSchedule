var trainData = new Firebase("https://trainschdule.firebaseio.com/");

$("#addUser").on("click", function(){
    var trainName = $("#trainNameInput").val().trim();
    var trainPlace = $("#placeInput").val().trim();
    var trainFirstTrain = $("#firstTrainInput").val().trim();
    var trainFrequency= $("#frequencyInput").val().trim();

    var newTrain= {
        name:  trainName,
        destination: trainPlace,
        train: trainFirstTrain,
        frequency: trainFrequency
    }

    trainData.push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination); 
    console.log(newTrain.train);
    console.log(newTrain.frequency)

    alert("Train successfully added");

    $("#trainNameInput").val("");
    $("#placeInput").val("");
    $("#firstTrainInput").val("");
    $("#frequencyInput").val("");

    return false;
});

trainData.on("child_added", function(childSnapshot, prevChildKey){

    console.log(childSnapshot.val());

    var getTrain = childSnapshot.val().name;
    var getDestination = childSnapshot.val().destination;
    var getFrequency = childSnapshot.val().frequency;
    var getNextArrival= childSnapshot.val().initialHours;
    var getMinutesAway = childSnapshot.val().initialMinutes;
  

      $("#trainTable > tbody").append("<tr><td>" + getTrain + "</td><td>" + getDestination + "</td><td>" + getFrequency + "</td><td>" + getNextArrival + "</td><td>" + getMinutesAway + "</td></tr>");
      
      $("<td>").text(getTrain);
      $("#trainData1").text(getDestination);
      $("#trainData2").text(getFrequency);
      $("#trainData3").text(getNextArrival);
      $("trainData4").text(getMinutesAway);
     
  
  
        var tFrequency = getFrequency; 
		var firstTime = newTrain.train;
		var firstTimeConverted = moment(firstTime,"hh:mm").subtract(1, "years");
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
		var getMinutesAway = tFrequency - tRemainder;
		console.log("MINUTES TILL TRAIN: " + getMinutesAway);
		// Next Train
		var getNextArrival = moment().add(getMinutesAway, "minutes")
		console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))
		
    
});
