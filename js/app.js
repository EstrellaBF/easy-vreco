const showMap = document.getElementById('map');
let latitude;
let longitude;

if (navigator.geolocation) {
  alert("Puedes usar geolocalización en tu dispositivo");
  function initMap() {
    // Función para usar la longitud y latitud
    function localization(position) {
      // retornando longitud y latitud actual
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // inicio api google maps
      var uluru = { lat: latitude, lng: longitude };
      var map = new google.maps.Map(showMap, {
        zoom: 15,
        center: uluru
      });
      var marker = new google.maps.Marker({
        position: uluru,
        map: map
      });
      // fin api googe maps

    }
    function error() {
      showMap.innerHTML = '<p>No se pudo obtener tu ubicación.</p>';
    }
    navigator.geolocation.getCurrentPosition(localization, error);

    // Autocompletado
    let startLocation = document.getElementById('start-location');
    let endLocation = document.getElementById('end-location');
    new google.maps.places.Autocomplete(startLocation);
    new google.maps.places.Autocomplete(endLocation);
  }
  google.maps.event.addDomListener(window, 'load', activatePlacesSearch);

  

}
else {
  alert("Lamentablemente geolocalización no funciona en tu dispositivo");
}

