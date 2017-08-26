/**MARKER FUNCTION**/
// Change marker color
function changeMarkerColor(map, newSelectedMarker) {
    if (currentSelectedMarker) {
        currentSelectedMarker.icon = defaultMarkerColor;    
    }
    newSelectedMarker.icon = selectedMarkerColor;
    refreshMarkersOnMap(map);
    currentSelectedMarker = newSelectedMarker;
}

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
            marker.setVisible(true);
        }
    });
}

// Loop through markers and set some markers invisible
function hideMarkers(l) {
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            marker.setVisible(false);
        }
    });
}

// Loop through markers and reset all markers visible
function setMarkersVisible() {
    markers.forEach(function(marker) {
        marker.setVisible(true);
    });
}

// Find marker of location which users select
function findMarkers(l) {
    var selectedMarker;
    markers.forEach(function(marker) {
        if (marker.title == l.title) {
            selectedMarker = marker;
        }
    });
    return selectedMarker;
}

// Make marker bounce once when trigger
function toggleBounce(marker) {
    if (marker.getAnimation() !== null) {
        marker.setAnimation(null);
    } else {
        if (infowindow) {
            infowindow.close();
        }
        marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function(){ marker.setAnimation(null); }, 750);
    }
}