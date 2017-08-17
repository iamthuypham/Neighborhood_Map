var map;
// Create a new blank array for all the listing markers.
var markers = [];

var locations = [
        { title: 'ARNOLD', location: { lat: 38.448581, lng: -90.398436 } },
        { title: 'Arden Arcade - Del P', location: { lat: 38.613804, lng: -121.368007 } },
        { title: 'Anaheim', location: { lat: 33.830586, lng: -117.938509 } },
        { title: 'Alamo Lake', location: { lat: 34.243889, lng: -113.558611 } },
        { title: 'AURORA HILLS', location: { lat: 38.859402, lng: -77.058899 } },
        { title: 'ALLEN PARK', location: { lat: 42.2283, lng: -83.2092 } },
        { title: 'Athens Supersite', location: { lat: 39.308, lng: -82.1183} },
        { title: 'Atascadero2', location: { lat: 35.494556, lng: -120.666203} }
        
    ];

function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7413549, lng: -73.9980244 },
        zoom: 13
    });
    // These are the real estate listings that will be shown to the user.
    // Normally we'd have these in a database instead.
    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    // The following group uses the location array to create an array of markers on initialize.
    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow)
        });
        
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

