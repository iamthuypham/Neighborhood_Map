var MapVM = function(map, markers, locations) {
    var self = this;
    self.googleMap = map;
    self.filteredLocations = ko.observableArray(locations);
    self.query = ko.observable('');
    self.selectedLocationTitle = ko.observable(selectedLocationTitle);
    
    self.closeInfoWindow = ko.pureComputed({
        read: function(){
            return self.query;
        },
        write: function(){
            if(infowindow) {
                infowindow.close();
            }
        },
        owner:this
    });
    
    // this function filters location based on users' search query
    self.filteredLocations = ko.computed(function () {
        // detect whether users input any text
        if (self.query()) {
            // if location_box input has some texts:
            // 1) get the value from input
            var search = self.query().toLowerCase();
            // 2) filter the locations list
            return ko.utils.arrayFilter(locations, function (location) {
                // location.title = location.title.toLowerCase()
                // if each location has title contains the input value:
                if (location.title.toLowerCase().indexOf(search) >= 0) {
                    // 1) set the markers of each location visible
                    showMarkers(location);
                    // 2) return only these visible location to display in <ul>
                    return location;
                } else {
                // if not: set the markers of each location invisible
                    hideMarkers(location);
                }
            });
        } else {
            // if location_box input has no text or user click reset 'x' button:
            // 1) set all markers visible
            setMarkersVisible();
            // 2) refresh the map and markers
            refreshMarkersOnMap(self.googleMap);
            // 3) return all locations to display in <ul>
            return locations;
        }
    });
    
    // this function triggers click on marker when users click on a location from the list
    self.selectLocation = ko.pureComputed({
        read: function(d){
        },
         write: function(d){
            // Change color of the selected location in the list
            self.selectedLocationTitle(d.title.toLowerCase());
            // Find marker of the selected location
      	    var marker = findMarkers(d);
      	    // Trigger Click event on the marker
            google.maps.event.trigger(marker,'click');
        },
        owner: this
    });
};