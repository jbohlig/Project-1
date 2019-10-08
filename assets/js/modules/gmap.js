export { map, initMap };

let map;
function initMap(lat, lon) {
    console.log(lat, lon)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lon },
        zoom: 9
    });
}
