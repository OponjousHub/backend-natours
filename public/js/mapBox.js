export const displayMap = function (location) {
  mapboxgl.accessToken =
    'pk.eyJ1Ijoib3BvbmpvdXNtYXAiLCJhIjoiY20xNjl0NXhzMGhxcjJqcXZnaWtpczZpZSJ9.Ys-hU-v54Yg5HJv7Zd7TIA';
  // mapboxgl.accessToken = ACCESS_TOKEN;
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    scrollZoom: false,
    center: [-118.113491, 34.1117451],
  });

  const bounds = new mapboxgl.LngLatBounds();

  location.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 25,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`Day <p>${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 100,
      right: 100,
      left: 100,
    },
  });
};
// mapbox://styles/oponjousmap/cm17teyin029001pmbz6ufzvc
