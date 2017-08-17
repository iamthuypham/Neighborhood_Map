/**LOAD & DISPLAY MARKER FUNCTION**/
// Removes the markers from the map, but keeps them in the array.
function clearMarkers() {
    setMapOnAll(null);
}

// Shows any markers currently in the array.
function showMarkers() {
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

// FILTER LOCATION & MARKER FUNCTION
function locationList(locations) {
    this.query = ko.observable('');
    this.filteredLocations = ko.observableArray(locations);
    
    this.filteredLocations = ko.computed(function () {
        // detect whether users input any text
        if (this.query()) {
            // if location_box input has some texts:
            // 1) get the value from input
            var search = this.query().toLowerCase();
            // 2) filter the locations list
            return ko.utils.arrayFilter(locations, function (location) {
                // location.title = location.title.toLowerCase()
                // if each location has title contains the input value:
                if (location.title.toLowerCase().indexOf(search) >= 0) {
                    // 1) set the markers of each location visible
                    onlyShowMarkers(location)
                    // 2) return only these visible location to display in <ul>
                    return location
                } else {
                // if not: set the markers of each location invisible
                    onlyHideMarkers(location)
                }
                // after set visibility, refresh the map and markers
                showMarkers(map)
            });
        } else {
            // if location_box input has no text or user click reset 'x':
            // 1) set all markers visible
            resetMarkers(location)
            // 2) refresh the map and markers
            showMarkers(map)
            // 3) return all locations to display in <ul>
            return locations
        }
        
    }, this);
    
}

ko.applyBindings(new locationList(locations));
