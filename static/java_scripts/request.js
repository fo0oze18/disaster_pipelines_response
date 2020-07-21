// These variables are used to construct the charts
let data = [];
let labels = [];

window.addEventListener('load', processDataset);

// This function renders a chart
function renderChart(data, labels, name, id) {
 console.log("functions gets executed");
 var ctx = document.getElementById(id).getContext('2d');

 var myChart = new Chart(ctx, {
  type: name,
  data: {
   labels: labels,
   datasets: [{
    barThickness: 60,
    minBarLength: 40,
    maxBarLength: 100,
    label: 'Genre Distribution',
    backgroundColor: [
     '#3DADA6',
     '#64D2FF',
     '#F7AC3E'
    ],
    borderColor: [
     '#3DADA6',
     '#64D2FF',
     '#F7AC3E'
    ],
    borderWidth: 2,
    data: data,
   }]
  },

 });

}

// This function calls when the page is being loaded. This function
// receives a JSON object from the python function, and processes the
// dataset loaded from the python script.
async function processDataset() {
 var newFreq = $('#name').val() //value I want to send
 console.log("jkdkdkdkdkdkdkdkdk hlll");
 await $.ajax({
  url: '/load',
  type: 'POST',
  data: newFreq,
  success: function(response) {
   var socialCounter = 0;
   var directCounter = 0;
   var newsCounter = 0;

   for (var i = 0; i < 26216; i++) {
    console.log(response[i][4])
    if (response[i][4] === "social") {
     socialCounter++;
    } else if (response[i][4] === "news") {
     newsCounter++;
    } else if (response[i][4] === "direct") {
     directCounter++;
    }
    if (i === 26215) {
     $(".loader-wrapper").fadeOut("slow");

    }
   }
   // Prepare the data to be inputted to the [renderChart] function
   labels = ["direct", "news", "social"];
   data = [directCounter, newsCounter, socialCounter];

   // render the charts
   renderChart(data, labels, 'bar', "myChart1");
   renderChart(data, labels, 'pie', "myChart2");
   // change the display property
   document.getElementById("myChart1").style.display = 'block';
   document.getElementById("myChart2").style.display = 'block';

  }
 })
}

// This function invokes an Ajax call, to submit the prediction to
// the model
function submitSentence() {
 newFreq = $('#name').val() //value I want to send
 if (newFreq.length > 0) {
  $.ajax({
   url: '/predict',
   type: 'POST',
   content_type: "application/json",
   data: {
    'message': newFreq
   },
   success: function(response) {

    var counter = 0;
    var string = "";
    var list = getNominalRepresentation(response)
    var color = ["#3DADA6", "#F7AC3E", "#64D2FF", "#fc036f"]
    // reference the div to display the results
    var resultDiv = document.getElementById("result")
    var tag = document.createElement("p");
    var text = document.createTextNode("The Message is Classified into: ");
    tag.appendChild(text);
    tag.style.fontFamily = 'Roboto'
    resultDiv.appendChild(tag);

    for (let i = 0; i < list.length; i++) {
     var tag = document.createElement("p");
     tag.style.marginLeft = '20px';
     tag.style.textAlign = 'center';
     tag.style.fontFamily = 'Roboto'
     tag.style.color = "white"
     tag.style.fontWeight = "bold"
     tag.style.fontSize = "12pt"
     tag.style.backgroundColor = color[getRandomArbitrary(0, 4)]
     tag.style.padding = '5px'
     tag.style.borderRadius = '10px'


     var text = document.createTextNode(list[i]);
     tag.appendChild(text);
     resultDiv.appendChild(tag);
    }

   }
  })
 } else {
  alert("Please Enter a Message !")
 }

}

// This function maps all categories which has a value of 1,
// to its nominal representation
function getNominalRepresentation(response) {
 var list = []
 var counter = 0;

 for (let i = 0; i < 36; i++) {
  if (response[i] === 1) {
   if (i === 0) {
    list[counter] = "related"
   } else if (i === 1) {
    list[counter] = "request"
   } else if (i === 2) {
    list[counter] = "offer"
   } else if (i === 3) {
    list[counter] = "aid-related"
   } else if (i === 4) {
    list[counter] = "medical-help"
   } else if (i === 5) {
    list[counter] = "medical-products"
   } else if (i === 6) {
    list[counter] = "search-and-rescue"
   } else if (i === 7) {
    list[counter] = "security"
   } else if (i === 8) {
    list[counter] = "military"
   } else if (i === 9) {
    list[counter] = "child-alone"
   } else if (i === 10) {
    list[counter] = "water"
   } else if (i === 11) {
    list[counter] = "food"
   } else if (i === 12) {
    list[counter] = "shelter"
   } else if (i === 13) {
    list[counter] = "clothing"
   } else if (i === 14) {
    list[counter] = "money"
   } else if (i === 15) {
    list[counter] = "missing-people"
   } else if (i === 16) {
    list[counter] = "refugees"
   } else if (i === 17) {
    list[counter] = "death"
   } else if (i === 18) {
    list[counter] = "other-aid"
   } else if (i === 19) {
    list[counter] = "infrastructure-related"
   } else if (i === 20) {
    list[counter] = "transport"
   } else if (i === 21) {
    list[counter] = "buildings"
   } else if (i === 22) {
    list[counter] = "electricity"
   } else if (i === 23) {
    list[counter] = "tools"
   } else if (i === 24) {
    list[counter] = "hospitals"
   } else if (i === 25) {
    list[counter] = "shops"
   } else if (i === 26) {
    list[counter] = "aid-centers"
   } else if (i === 27) {
    list[counter] = "other-infrastructure"
   } else if (i === 28) {
    list[counter] = "weather-related"
   } else if (i === 29) {
    list[counter] = "floods"
   } else if (i === 30) {
    list[counter] = "storm"
   } else if (i === 31) {
    list[counter] = "fire"
   } else if (i === 32) {
    list[counter] = "earthquake"
   } else if (i === 33) {
    list[counter] = "cold"
   } else if (i === 34) {
    list[counter] = "other-weather"
   } else if (i === 35) {
    list[counter] = "direct-report"
   }
   counter++
  }
 }

 return list

}

// This function generates a random number between (1..4), to decide which color to choose
function getRandomArbitrary(min, max) {
 let n = Math.floor(Math.random() * (max - min) + min);
 console.log(" PRINT:    " + n)
 return n
}
