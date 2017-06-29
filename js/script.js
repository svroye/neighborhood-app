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

var Place = function(data){
  this.name = data.name;
  this.address = data.address;
  this.location = data.location;
  this.marker = data.marker;
  this.showItem = data.showItem;
};

function AppViewModel() {

  var self = this;
  this.placesList = ko.observableArray();
  this.markersList = ko.observableArray();

  var largeInfowindow = new google.maps.InfoWindow();
  var inputField = document.getElementById('search-place-text');
  var bounds = new google.maps.LatLngBounds();

  importantPlaces.forEach(function(item,number){

    var marker = new google.maps.Marker({
      position: item.location,
      title: item.name,
      animation: google.maps.Animation.DROP,
      id: number,
      map: map
    });

    bounds.extend(marker.position);

    marker.addListener('click', function() {
      populateInfoWindow(this, largeInfowindow);
    });

    self.newItem = ko.observable({
      name: item.name,
      address: item.address,
      location: item.location,
      marker: marker,
      showItem: true
    });

    self.placesList.push(self.newItem)
  })

  this.placeName = ko.observable("");



  this.updateList = function() {
    var currentValue = self.placeName().toLowerCase();
    console.log(currentValue)

    for(var i=0; i< self.placesList().length;i++){
      var currentElement = self.placesList()[i];
      var currentAddress = currentElement().address;
      var currentName = currentElement().name;
      
      if(!currentName.includes(currentValue) && !currentAddress.includes(currentValue)){
        currentElement().showItem = false;
      } 
    }
  }
  

  this.openMarker = function(item){
    populateInfoWindow(item.marker,largeInfowindow);
  }

}

document.onerror = function() {
  alert('Problem with loading the script. Please check your connetivity and try again later.')
}