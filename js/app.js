const showMap = document.getElementById('map');
const startLocation = document.getElementById('start-location');
const endLocation = document.getElementById('end-location');
let latitude;
let longitude;

if (navigator.geolocation) {
  alert("Puedes usar geolocalización en tu dispositivo");
  function initMap() {// Función para usar la longitud y latitud
    function localization(position) {
      // retornando longitud y latitud actual
      latitude = position.coords.latitude;
      longitude = position.coords.longitude;
      // inicio api google maps
      var uluru = { lat: latitude, lng: longitude };
      console.log(latitude);
      console.log(longitude);
      var map = new google.maps.Map(document.getElementById('map'), {
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
    // 
    var bla = navigator.geolocation.getCurrentPosition(localization, error);



  }
}
else {
  alert("Lamentablemente geolocalización no funciona en tu dispositivo");
}


