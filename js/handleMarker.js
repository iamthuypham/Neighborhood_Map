/**MARKER FUNCTION**/
// Loop through markers list and set them on map
function refreshMarkersOnMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Loop through markers and set some markers visible
function showMarkers(l) {
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            marker.visible = true;
        }
    })
}

// Loop through markers and set some markers invisible
function hideMarkers(l) {
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            marker.visible = false;
        }
    })
}

// Loop through markers and reset all markers visible
function setMarkersVisible() {
    markers.forEach(function(marker) {
        marker.visible = true;
    })
}

// Find marker of location which users select
function findMarkers(l) {
    var selectedMarker;
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            selectedMarker = marker;
        }
    })
    return selectedMarker;
}