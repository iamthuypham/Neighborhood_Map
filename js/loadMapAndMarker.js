var markers = [];
var infowindow;

google.maps.event.addDomListener(window, 'load', function(){
    
    var locations = [
            { title: 'ARNOLD', latLng: { lat: 38.448581, lng: -90.398436 } },
            { title: 'Arden Arcade - Del P', latLng: { lat: 38.613804, lng: -121.368007 } },
            { title: 'Anaheim', latLng: { lat: 33.830586, lng: -117.938509 } },
            { title: 'Alamo Lake', latLng: { lat: 34.243889, lng: -113.558611 } },
            { title: 'AURORA HILLS', latLng: { lat: 38.859402, lng: -77.058899 } },
            { title: 'ALLEN PARK', latLng: { lat: 42.2283, lng: -83.2092 } },
            { title: 'Athens Supersite', latLng: { lat: 39.308, lng: -82.1183} },
            { title: 'Atascadero2', latLng: { lat: 35.494556, lng: -120.666203} }
            
        ];
    
    var googleMap = createMap();
    var googleMarker = createMarker(locations, googleMap);
    ko.applyBindings(new koViewModel(googleMap, googleMarker, locations));
});

function createMap (){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 2
    });
    return map
}

function createMarker(locations, map) {
    infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    
    locations.forEach(function(location, index) {
        var markerOptions = {
            map: self.googleMap,
            position: location.latLng,
            title: location.title,
            animation: google.maps.Animation.DROP,
            id: index
        };
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker(markerOptions);
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, infowindow)
        });
        
        bounds.extend(markers[index].position);
    });
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}
