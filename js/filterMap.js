/**LOAD & DISPLAY MARKER FUNCTION**/
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers(map) {
    setMapOnAll(map);
}

// Deletes all markers in the array by removing references to them.
function deleteMarkers() {
    clearMarkers();
    markers = [];
}

// Loop through markers list and set them on map
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

// Loop through markers and set some markers visible
function onlyShowMarkers(l) {
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            marker.visible = true
        }
    })
}

// Loop through markers and set some markers invisible
function onlyHideMarkers(l) {
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            marker.visible = false
        }
    })
}

// Loop through markers and reset all markers visible
function resetMarkers(l) {
    markers.forEach(function(marker) {
        marker.visible = true
    })
}

function findMarkers(l) {
    var selectedMarker
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            selectedMarker = marker
        }
    })
    return selectedMarker
}