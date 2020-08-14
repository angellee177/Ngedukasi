mapboxgl.accessToken = 'pk.eyJ1IjoiYW5nZWxsZWUxNzciLCJhIjoiY2tjOXZhb2hrMHFoMDMwbXA3NjQ4dmRsZyJ9.8aySnI0Bhsa6LpjJJAHDVg';

const map = new mapboxgl.Map ({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    zoom: 9,
    center: [-71.157895, 42.707741]
})