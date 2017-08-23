/*LOAD & DISPLAY MARKER INFO WINDOW FUNCTION**/
// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
    var openAirData = [];
    var html = '';
    loadOpenAirData(marker, function(data){
        if (typeof (data) == 'string') {
            html += '<p>'+data+'</p>';
        } else {
            openAirData = data;
        }
        for (var i = 0; i < openAirData.length; i++) {
            var name = openAirData[i].parameter;
            // styling name
            switch(name) {
                case "pm10":
                    name = 'PM<sub>10</sub>';
                    break;
                case "pm25":
                    name = 'PM<sub>25</sub>';
                    break;
                case "o3":
                    name = 'O<sub>3</sub>';
                    break;
                case "no2":
                    name = 'NO<sub>2</sub>';
                    break;
                case "so2":
                    name = 'SO<sub>2</sub>';
                    break;
                case "co":
                    name = 'CO';
                    break;
                case "bc":
                    name = 'BC';
                    break;
                default:
                    name = name;
                    break;
            }
            var value = openAirData[i].value;
            // styling name and value
            html += '<li><strong>'+name+'</strong>: '+value+'</li>';
        }
        
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker != marker) {
            infowindow.marker = marker;
            infowindow.setContent(
                '<div class="marker_title">' + marker.title.toLowerCase() + '</div>' + '<ul>'+html+'</ul>'
                );
            infowindow.open(map, marker);
            // Make sure the marker property is cleared if the infowindow is closed.
            infowindow.addListener('closeclick', function() {
                infowindow.setMarker = null;
            });
        }
    });   
}