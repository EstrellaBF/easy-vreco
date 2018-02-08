const showMap = document.getElementById('map');
let latitude;
let longitude;

if (navigator.geolocation) {
  alert('Puedes usar geolocalización en tu dispositivo');

  function initMap() {
    // Función para usar la longitud y latitud
    let localization = (position) => {
      // retornando longitud y latitud actual
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // inicio api google maps
      let getPosition = {
        lat: latitude,
        lng: longitude
      };
      let map = new google.maps.Map(showMap, {
        zoom: 15,
        center: getPosition
      });

      let geocoder = new google.maps.Geocoder;
      let infowindow = new google.maps.InfoWindow;
      geocodeLatLng(geocoder, map, infowindow);

      function geocodeLatLng(geocoder, map, infowindow) {
        geocoder.geocode({
          'location': getPosition
        }, function (results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(15);
              let marker = new google.maps.Marker({
                position: getPosition,
                map: map,
                title: 'bicycle marker',
                icon: 'assets/icon/bike.png'
              });
              startLocation.value = results[0].formatted_address;
              // infowindow.setContent(results[1].formatted_address);
              infowindow.setContent(`<div id='info_window'><span id='geocodedAddress'>${results[0].formatted_address}</span><br><strong>Latitud:</strong> ${getPosition.lat.toFixed(4)} | <strong>Longitud:</strong> ${getPosition.lng.toFixed(4)}</div>`);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
        });
      }

      // Autocompletado
      let startLocation = document.getElementById('start-location');
      let endLocation = document.getElementById('end-location');
      new google.maps.places.Autocomplete(startLocation);
      new google.maps.places.Autocomplete(endLocation);

      // Calculando ruta
      let directionsService = new google.maps.DirectionsService;
      let directionsDisplay = new google.maps.DirectionsRenderer;
      let calculateAndDisplayRoute = (directionsService, directionsDisplay) => {
        directionsService.route({
          origin: startLocation.value,
          destination: endLocation.value,
          travelMode: 'DRIVING'
        }, (response, status) => {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Tu ruta no se encuentra disponible');
          }
        });
      };
      directionsDisplay.setMap(map);
      let traceRoute = () => {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
      };
      document.getElementById('mark-route').addEventListener('click', traceRoute);
    };
    let error = () => {
      showMap.innerHTML = '<p>No se ingresó correctamente la dirección. Busca de nuevo.</p>';
    };
    navigator.geolocation.getCurrentPosition(localization, error);
  };
  // google.maps.event.addDomListener(window, 'load', activatePlacesSearch);
} else {
  alert('Lamentablemente geolocalización no funciona en tu dispositivo');
}