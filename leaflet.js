let map = L.map('map');
map.setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);
;

let marker = [];

function addMarker(coordinateArray) {
    let marker = L.marker(coordinateArray);
    marker.push(marker);
    marker.addTo(map);
}
