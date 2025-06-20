/// https://diffore.github.io/coords_to_map/?coords=lat1,long1&coords=lat2,long2
const search_querry_coordinates_keyword = "coords"

// extract arguments from querry
function getCoordParams (url = window.location.search) {
	// Create a params object
	let coords_pairs_string = []
    const searchParams = new URLSearchParams(url);
    coords_pairs_string = searchParams.getAll(search_querry_coordinates_keyword)
    coords_pairs_string.forEach((o, i, a) => a[i] = a[i].replace(" ", "").split(","))
	return coords_pairs_string;
}

// POPUPS FOR COORDS
function show_popup(map) {
    var popup = L.popup();
        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Coordinates:\n" + e.latlng.lat + "," + e.latlng.lng)
                .openOn(map);
        }
    map.on('click', onMapClick);
}

// INIT MAP
function  build_map(initial_view_coord_arr =  [51.505, -0.09]){
    var map = L.map('map').setView(initial_view_coord_arr, 15);  // [51.505, -0.09]
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    return map;
}


onload = (event) => { 
    // extract coordinates from search query
    coords = getCoordParams();
    // console.log(coords);

    // nothing to do if noo coordinates provided 
    if (coords.length == 0){
        document.getElementById("map").textContent = "ERROR! Access page with parameters: ?coords=lat1,long1&coords=lat1,long2"
        return;
    }

    // build map
    var map = build_map();
    // move to coordinates proved
    map.fitBounds(coords);
    // zoom out for instant visibility of all coordinates
    map.zoomOut(1)
    // create a marker for each coordinate
    coords.forEach((o, i, a) => L.marker(a[i]).addTo(map))
    // optional popup for coordinates on click
    show_popup(map);
}