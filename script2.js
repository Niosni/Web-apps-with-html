function initMap() {
  var uluru = {lat: 60.444, lng: 22.3};
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 11, center: uluru});
  var marker = new google.maps.Marker({position: uluru, map: map});
}


function search(){
	var country = document.getElementById("country").value;
	var zip = document.getElementById("zip").value;
	var client = new XMLHttpRequest();
	
		var url = "http://api.zippopotam.us/" + country + "/" + zip;
		client.open("GET", url, true);
		client.onreadystatechange = function() {
			if(client.readyState == 4) {
				var data = JSON.parse(client.responseText)
				updateMap(data);
			};
		};
	
	client.send();
	lastSearch = zip + ", " + country;
	localStorage.lastSearch = lastSearch;
	
	var pastSearches = [];

	if(localStorage["pastSearches"]) {
	     pastSearches = JSON.parse(localStorage["pastSearches"]);
	}

	document.getElementById('history').innerHTML = "";
	document.getElementById('history').appendChild(makeUL(pastSearches));
	
	if(pastSearches.indexOf(lastSearch) == -1) {
	     pastSearches.unshift(lastSearch);
	     if(pastSearches.length > 10) { 
	        pastSearches.pop();
	     }
	     localStorage["pastSearches"] = JSON.stringify(pastSearches);
	}
	
	
	document.getElementById('1').innerHTML = localStorage.lastSearch;
}

function updateMap(data){
	var loc = new google.maps.LatLng(data.places[0].latitude , data.places[0].longitude);
	var map = new google.maps.Map(
		      document.getElementById('map'), {zoom: 11, center: loc});
	var marker = new google.maps.Marker({position: loc, map: map});
}

function makeUL(array) {
    // Create the list element:
    var list = document.createElement('ul');

    for (var i = 0; i < array.length; i++) {
        // Create the list item:
        var item = document.createElement('li');

        // Set its contents:
        item.appendChild(document.createTextNode(array[i]));

        // Add it to the list:
        list.appendChild(item);
    }

    // Finally, return the constructed list:
    return list;
}
