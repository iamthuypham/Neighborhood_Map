var markers = [];
var currentSelectedMarker;
var selectedLocationTitle = '';
var infowindow;
var defaultMarkerColor = {
    url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|B7F3FF',
};
var selectedMarkerColor = {
    url: 'https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|EF17BD',
};

function initMap(){
    var googleMap = createMap();
    var googleMarker = createMarker(locations, googleMap);
    window.vm = new MapVM(googleMap, googleMarker, locations); 
    ko.applyBindings(vm);
}

function createMap (){
    var map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 39.742043, lng: -104.991531 },
        zoom: 4
    });
    return map;
}

function createMarker(locations, map) {
    infowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();
    
    locations.forEach(function(location, index) {
        var markerOptions = {
            map: self.googleMap,
            position: location.latLng,
            title: location.title,
            icon: defaultMarkerColor,
            animation: google.maps.Animation.DROP,
            id: index
        };
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker(markerOptions);
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            window.vm.selectedLocationTitle(marker.title.toLowerCase());
            // Change to marker with different color
            changeMarkerColor(map, this);
            // Marker bounce
            toggleBounce(this);
            // Open an info window
            populateInfoWindow(this, infowindow);
        });
        
        bounds.extend(markers[index].position);
    });
    // Extend the boundaries of the map for each marker
    google.maps.event.addDomListener(window, 'resize', function() {
            map.fitBounds(bounds);
    });
}

// This function handle Google Map AI request errors
function mapError() {
    alert("Google Map error.");
}

// This function handle Google Map authorization error
function gm_authFailure() {
    alert("Google Map authorization error. Please try refreshing the page.");
}
