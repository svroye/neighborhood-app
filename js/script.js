var importantPlaces = [
{
	name: "Flanders Expo",
	address: "Maaltekouter 1, 9051 Gent",
	location: {lat: 51.025984 , lng: 3.690763}
},
{
	name: "Vooruit",
	address: "Sint-Pietersnieuwstraat 23, 9000 Gent",
	location: {lat: 51.047704 , lng: 3.727382}
},
{
	name: "Stedelijk Museum voor Actuele Kunst",
	address: "Jan Hoetplein 1, 9000 Gent",
	location: {lat: 51.037257 , lng: 3.723533}
},
{
	name: "Capitool",
	address: "Graaf Van Vlaanderenplein 5, 9000 Gent",
	location: {lat: 51.04811 , lng: 3.732215}
},
{
	name: "Sint-Baafskathedraal",
	address: "Sint-Baafsplein, 9000 Gent",
	location: {lat: 51.05339 , lng: 3.725113}
},
{
	name: "Korenmarkt",
	address: "Korenmarkt 18, 9000 Gent",
	location: {lat: 51.054627 , lng: 3.721769}
},
{
	name: "Gravensteen",
	address: "Sint-Veerleplein 11, 9000 Gent",
	location: {lat: 51.057529 , lng: 3.720737}
},
{
	name: "Kinepolis",
	address: "Ter Platen 12, 9000 Gent",
	location: {lat: 51.040544 , lng: 3.729963}
},
{
	name: "Gent-Sint-Pietersstation",
	address: "Koningin Maria Hendrikaplein 1, 9000 Gent",
	location: {lat: 51.03725 , lng: 3.709497}
},
{
	name: "Universitair Ziekenhuis Gent",
	address: "De Pintelaan 185, 9000 Gent",
	location: {lat: 51.024557 , lng: 3.725222}
}

];

var Place = function(data){
	this.name = data.name;
	this.address = data.address;
};

function AppViewModel() {
	var self = this;
	this.placesList = ko.observableArray();
	this.markersList = ko.observableArray();

	importantPlaces.forEach(function(item,number){
		self.placesList.push(new Place(item));
		var marker = new google.maps.Marker({
            position: item.location,
            title: item.name,
            animation: google.maps.Animation.DROP,
            id: number
          });
	})


}


ko.applyBindings(new AppViewModel());