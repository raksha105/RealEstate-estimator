// Put your zillow.com API key here
var zwsid = "my_zillow_key";

var request = new XMLHttpRequest();

var new_request = new XMLHttpRequest();
var geocoder;
var map;

var postal
var for_Zilla
var estimate
var infowindow
var infowindow2
var new_content
var marker
var lat_lon
var reverse_address
var zilla_reverse
var for_Zilla2
var new_content2



function clearform()
{
	document.getElementById("do_reset").reset();
}


function initialize () {
	geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(32.75, -97.13);
    var mapOptions = {
    zoom: 17,
    center: latlng
    }
    map = new google.maps.Map(document.getElementById("map"), mapOptions);

	
}
function sendRequest () {
	
    
	//marker = new google.maps.Marker({
            //map: map,
            //position: results[0].geometry.location,
			//title: estimate
		
        //});
	
	var addr = document.getElementById("addr").value;
    geocoder.geocode( { 'address': addr}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
		 
        postal = results[0].formatted_address
		map.setCenter(results[0].geometry.location);
	//document.getElementById("results").innerHTML += postal
	
	if (marker) {
		marker.setPosition(results[0].geometry.location);
	} 
	else {
		marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location	
		  //markers.push(marker)
		});}
		for_Zilla = postal.split(",")
	//document.getElementById("zilla").innerHTML = for_Zilla[0]+for_Zilla[1]+for_Zilla[2]+for_Zilla[3]
	//document.getElementById("zilla").innerHTML = address
		request.open("GET","proxy.php?zws-id="+zwsid+"&address="+for_Zilla[0]+"&citystatezip="+for_Zilla[1]+"+"+for_Zilla[2]+"+"+for_Zilla[3]);
		request.onreadystatechange = function(){
		
		var xml = request.responseXML.documentElement;
        var value = xml.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
		document.getElementById("zilla").innerHTML += postal+" "+"$"+value+"<br>"
		new_content = infowindow.getContent();

		infowindow.setContent(new_content+value)
		
	}
		
		request.withCredentials = "true";
		request.send(null);	

		infowindow = new google.maps.InfoWindow({
		content:postal+" $"
  });
		infowindow.open(map, marker);

	google.maps.event.addListener(map, 'click', function(event) {
	
	oneMarker(event.latLng);
	lat_lon = event.latLng
});

function oneMarker(location) {
	geocoder.geocode({'location': lat_lon}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
		reverse_address = lat_lon
		//document.getElementById("results").innerHTML += results[0].formatted_address+"<br>"
		zilla_reverse = results[0].formatted_address
		for_Zilla2 = zilla_reverse.split(",")
		new_request.open("GET","proxy.php?zws-id="+zwsid+"&address="+for_Zilla2[0]+"&citystatezip="+for_Zilla2[1]+"+"+for_Zilla2[2]+"+"+for_Zilla2[3]);
	new_request.onreadystatechange = function(){
		
		var xml2 = new_request.responseXML.documentElement;
        var value2 = xml2.getElementsByTagName("zestimate")[0].getElementsByTagName("amount")[0].innerHTML;
		document.getElementById("zilla").innerHTML += zilla_reverse+" "+"$"+value2+"<br>"
		new_content2 = infowindow2.getContent();
		infowindow2.setContent(new_content2+value2)	
	}
	
		new_request.withCredentials = "true";
		new_request.send(null);	
	
		infowindow2 = new google.maps.InfoWindow({
		content:zilla_reverse+" $"
  });

		infowindow2.open(map, marker);		
		if (marker && marker.setPosition) {
            marker.setPosition(reverse_address);
        } else 
		{
		marker = new google.maps.Marker({
        map: map,
        position: reverse_address	
		  //markers.push(marker)
	
		});
			}
				}
					});
		
						}
							}	  
		else {
			
			alert("Geocode was not successful for the following reason: " + status);
			}
				});
	  	  
}
