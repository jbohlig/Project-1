export { map, initMap };

let map;
let marker;
function initMap(lat, lon, title) {
    console.log(lat, lon)
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lon },
        zoom: 9
    });

    marker = new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
        title: title
      });
}
