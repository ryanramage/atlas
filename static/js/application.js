var _ = require('underscore')._;

$(document).ready(function(){

    var geojson;

    var updateItemsDebounced = _.debounce(updateItems, 1000);

    function updateItems(bounds) {
        var args = [
            bounds.getSouthWest().lng,
            bounds.getSouthWest().lat,
            bounds.getNorthEast().lng,
            bounds.getNorthEast().lat
        ];
        $.ajax({
            url: './data?bbox=' + args.join(',') + '&limit=20',
            dataType: 'json',
            success: function(data) {
                if (geojson) {
                    map.removeLayer(geojson);
                }

                map.addLayer(geojson = new L.GeoJSON(data));
            }
        });

    }

    // initialize the map on the "map" div with a given center and zoom
    var map = new L.Map('map', {
        center: new L.LatLng(43.16,-89.20),
        zoom: 13
    });

    // create a CloudMade tile layer
    var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png',
        cloudmade = new L.TileLayer(cloudmadeUrl, {maxZoom: 18});

    // add the CloudMade layer to the map
    map.addLayer(cloudmade);

    map.on('dragend', function(evt) {
        updateItemsDebounced(map.getBounds());
    });

});