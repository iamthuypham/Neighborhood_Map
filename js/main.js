// This function populates the list of places in the right menu
function locationList(locations) {
    this.query = ko.observable('');
    
    this.filteredLocations = ko.computed(function () {
        if (this.query()) {
            var search = this.query().toLowerCase();
            return ko.utils.arrayFilter(locations, function (location) {
                return location.title.toLowerCase().indexOf(search) >= 0;
            });
        } else {
            return locations
        }
}, this);
}

ko.applyBindings(new locationList(locations))
