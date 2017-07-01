var importantPlaces = [
{
  name: "Flanders Expo",
  address: "Maaltekouter 1, 9051 Gent",
  location: {lat: 51.025984 , lng: 3.690763},
  showItem: true
},
{
  name: "Vooruit",
  address: "Sint-Pietersnieuwstraat 23, 9000 Gent",
  location: {lat: 51.047704 , lng: 3.727382},
  showItem: true
},
{
  name: "Stedelijk Museum voor Actuele Kunst",
  address: "Jan Hoetplein 1, 9000 Gent",
  location: {lat: 51.037257 , lng: 3.723533},
  showItem: true
},
{
  name: "Capitool",
  address: "Graaf Van Vlaanderenplein 5, 9000 Gent",
  location: {lat: 51.04811 , lng: 3.732215},
  showItem: true
},
{
  name: "Sint-Baafskathedraal",
  address: "Sint-Baafsplein, 9000 Gent",
  location: {lat: 51.05339 , lng: 3.725113},
  showItem: true
},
{
  name: "Korenmarkt",
  address: "Korenmarkt 18, 9000 Gent",
  location: {lat: 51.054627 , lng: 3.721769},
  showItem: true
},
{
  name: "Gravensteen",
  address: "Sint-Veerleplein 11, 9000 Gent",
  location: {lat: 51.057529 , lng: 3.720737},
  showItem: true
},
{
  name: "Kinepolis",
  address: "Ter Platen 12, 9000 Gent",
  location: {lat: 51.040544 , lng: 3.729963},
  showItem: true
},
{
  name: "Gent-Sint-Pietersstation",
  address: "Koningin Maria Hendrikaplein 1, 9000 Gent",
  location: {lat: 51.03725 , lng: 3.709497},
  showItem: true
},
{
  name: "Universitair Ziekenhuis Gent",
  address: "De Pintelaan 185, 9000 Gent",
  location: {lat: 51.024557 , lng: 3.725222},
  showItem: true
}
];

function AppViewModel() {

  var self = this;
  //create array for the place items
  this.placesList = ko.observableArray();
  //create variables for making an infoWindow for the markers and for the bounds of the map
  var largeInfowindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();

  // loop through the places, make a marker for each of them, extend the bounds of the map to
  // include the place, add a listener for the marker to fill it when clicked
  // Also create a knockout observable for each place and add it to the array defined above 
  importantPlaces.forEach(function(item,number){
    //create the marker
    var marker = new google.maps.Marker({
      position: item.location,
      title: item.name,
      animation: google.maps.Animation.DROP,
      id: number,
      map: map
    });

    // extend the boundaries of the map
    bounds.extend(marker.position);

    // add clicklistener for filling and opening the infowindow 
    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    // create a new variable for the places
    self.newItem = ko.observable({
      name: item.name,
      address: item.address,
      location: item.location,
      marker: marker,
      showItem: true
    });

    // add the variable to the array
    self.placesList.push(self.newItem)
  })

  // variable for the input value in the filterbox
  this.placeName = ko.observable("");


  // called whenever the user types something in the filter box
  this.updateList = function() {
    //takes current value in the filter box
    var currentValue = self.placeName().toLowerCase();
    // loop through the different placesin the array
    for(var i=0; i< self.placesList().length;i++){
      // take the current element of the array and its values
      var currentElement = self.placesList()[i];
      var currentName = currentElement().name;
      var currentAddress = currentElement().address;
      var currentLocation = currentElement().location;
      var currentMarker = currentElement().marker;
      var currentShowItem = currentElement().showItem;
      
      if(!currentName.toLowerCase().includes(currentValue) && !currentAddress.toLowerCase().includes(currentValue)){
        currentElement({
          name: currentName,
          address: currentAddress,
          location: currentLocation,
          marker: currentMarker,
          showItem: false
        })
        currentMarker.setMap(null);
      } else {
        currentElement({
          name: currentName,
          address: currentAddress,
          location: currentLocation,
          marker: currentMarker,
          showItem: true
        })
        currentMarker.setMap(map);
      }
    }
  }
  
  // called when a list item is clicked
  this.openMarker = function(item){
    populateInfoWindow(item.marker,largeInfowindow);
  }

}
