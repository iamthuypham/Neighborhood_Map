// This function populates the list of places in the right menu
function locationList(locations) {
    this.locations = ko.observableArray(locations);
    this.title = ko.observable()
    this.shouldShowLocation = ko.observable(true);
    
    var searchBox = document.getElementById("search_box");
    searchBox.addEventListener("keyup", function() {
        // console.log(this)
        var val = searchBox.value;
        if (this.title().toLowerCase().includes(val)) {
            this.shouldShowLocation(true)
        } else {
            this.shouldShowLocation(false)
        }
    })
}

ko.applyBindings(new locationList(locations))
