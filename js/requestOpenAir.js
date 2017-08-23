/**REQUEST AIR QUALITY FROM OPENAIR API**/
function loadOpenAirData(marker, callback) {
    var openAirUrl = 'https://api.openaq.org/v1/latest?location='+marker.title;
    // Ajax request 
    $.ajax({
        url: openAirUrl,
        success: function(data) {
            // Retrieve results
            callback(data.results[0].measurements);
        },
        error: function(e) {
            callback("Unable to retrieve data");
        }
    });
}