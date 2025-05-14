// Initialize and add the map, panels and renders
let map;
let map2;
let map3;
let map4;
let directionsService;
let directionsRenderer;
let directionsService2;
let directionsRenderer2;
let directionsService3;
let directionsRenderer3;
let directionsService4;
let directionsRenderer4;
const { Map } = await google.maps.importLibrary("maps");
//Map 1
window.initMap = async function() {
  const position = { lat: 39.391695412342, lng: -76.61235484722265 };
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer()
  var mapOptions = {
    zoom:15,
    center: position
  }
  map = new google.maps.Map(document.getElementById("map"), mapOptions);
  directionsRenderer.setMap(map)
  directionsRenderer.setPanel(document.getElementById("directionsPanel"));}

//Map 2
window.initMap2 = async function() {
  const position2 = { lat: 39.3916954123423, lng: -76.61235484722265 };

  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  directionsService2 = new google.maps.DirectionsService();
  directionsRenderer2 = new google.maps.DirectionsRenderer()
  var mapOptions2 = {
    zoom:15,
    center: position2
  }
  map2 = new google.maps.Map(document.getElementById("map2"), mapOptions2);
  directionsRenderer2.setMap(map2)
  directionsRenderer2.setPanel(document.getElementById("directionsPanel2"));}


//Map 3
window.initMap3 = async function() {

  const position3 = { lat: 39.3916954123423, lng: -76.61235484722265 };

  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  directionsService3 = new google.maps.DirectionsService();
  directionsRenderer3 = new google.maps.DirectionsRenderer()

  var mapOptions3 = {
    zoom:15,
    center: position3
  }
  map3 = new google.maps.Map(document.getElementById("map3"), mapOptions3);
  directionsRenderer3.setMap(map3)
  directionsRenderer3.setPanel(document.getElementById("directionsPanel3"));}

  window.initMap4 = async function() {
    const position4 = { lat: 39.3916954123423, lng: -76.61235484722265 };
    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");
    directionsService4 = new google.maps.DirectionsService();
    directionsRenderer4 = new google.maps.DirectionsRenderer()
    // The map, centered at Uluru
    var mapOptions4 = {
      zoom:15,
      center: position4
    }
    map4 = new google.maps.Map(document.getElementById("map4"), mapOptions4);
    directionsRenderer4.setMap(map4)
    directionsRenderer4.setPanel(document.getElementById("directionsPanel4"));}

initMap();

initMap2();

initMap3();

initMap4();

async function getdirect(startCode, endCode) {
  const [startRes, endRes] = await Promise.all([
    fetch(`http://localhost:3500/api/coordinates/${startCode}`),
    fetch(`http://localhost:3500/api/coordinates/${endCode}`)
  ]);

  if (!startRes.ok || !endRes.ok) {
    throw new Error("Failed to fetch one or both coordinates from server.");
  }

  const start = await startRes.json();
  const end = await endRes.json();

  return [start.lat, start.lng, end.lat, end.lng];
}
async function CalcRoute(yourSelect, yourSelect2) {
  let direc = await getdirect(yourSelect, yourSelect2);
  let slat = direc[0];
  let slong = direc[1];
  let dlat = direc[2];
  let dlong = direc[3];

  var request = {
    origin: { lat: slat, lng: slong },
    destination: { lat: dlat, lng: dlong },
    travelMode: "WALKING",
    provideRouteAlternatives: true
  };
  directionsService.route(request, function(response, status) {
    if (status === "OK") {
      alert("Directions request successful");
      directionsRenderer.setDirections(response);
    } else {
      alert("Directions request failed due to " + status);
    }
  });
}


async function CalcRoute4(yourSelect, yourSelect2) {
  let direc = await getdirect(yourSelect, yourSelect2);
  let slat = direc[0];
  let slong = direc[1];
  let dlat = direc[2];
  let dlong = direc[3];

  var request = {
    origin: { lat: slat, lng: slong },
    destination: { lat: dlat, lng: dlong },
    travelMode: "WALKING",
    provideRouteAlternatives: true
  };
  directionsService2.route(request, function(response, status) {
    if (status === "OK") {
      directionsRenderer2.setDirections(response);
    } else {
    }
  });
}

async function CalcRoute2(yourSelect, yourSelect2) {
  let direc = await getdirect(yourSelect, yourSelect2);
  let slat = direc[0];
  let slong = direc[1];
  let dlat = direc[2];
  let dlong = direc[3];

  var request = {
    origin: { lat: slat, lng: slong },
    destination: { lat: dlat, lng: dlong },
    travelMode: "WALKING",
    provideRouteAlternatives: true
  };
  directionsService4.route(request, function(response, status) {
    if (status === "OK") {
      directionsRenderer4.setDirections(response);
    } else {
    }
  });
}
async function CalcRoute3(yourSelect, yourSelect2) {
  let direc = await getdirect(yourSelect, yourSelect2);
  let slat = direc[0];
  let slong = direc[1];
  let dlat = direc[2];
  let dlong = direc[3];

  var request = {
    origin: { lat: slat, lng: slong },
    destination: { lat: dlat, lng: dlong },
    travelMode: "WALKING",
    provideRouteAlternatives: true
  };
  directionsService3.route(request, function(response, status) {
    if (status === "OK") {
      directionsRenderer3.setDirections(response);
    } else {
    }
  });
}

const form = document.getElementById("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  var yourSelect = document.getElementById("building1");
  var yourSelect2 = document.getElementById("building2");
  try {
    CalcRoute(yourSelect.value, yourSelect2.value);
  } catch (error) {
   alert(error);
  }

});

const form2 = document.getElementById("year_building");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  var AiHome = document.getElementById("homee");
  var AiYear = document.getElementById("year");
  var AIMajor = document.getElementById("major");
  try {
    AICalcRoute(yourSelect.value, yourSelect2.value);
  } catch (error) {
   alert(error);
  }

});

export {CalcRoute2, CalcRoute3, CalcRoute4, getdirect };
// DirectionsRequest({
//   origin: s,
//   destination: d,
//   waypoints: [{
//     location: s,
//     stopover: false
//   },{
//     location: d,
//     stopover: false
//   }],
//   provideRouteAlternatives: true,
//   travelMode: "WALKING",
// })
