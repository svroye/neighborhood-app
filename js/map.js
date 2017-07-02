var map;
var NYTApiKey = "8c50570480a84e43953e42c4c556b6dd";

function initMap() {
        // Create a styles array to use with the map.
        var styles = [
        {
            featureType: 'water',
            stylers: [
                { color: '#19a0d8' }
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.stroke',
            stylers: [
                { color: '#ffffff' },
                { weight: 6 }
            ]
        }, {
            featureType: 'administrative',
            elementType: 'labels.text.fill',
            stylers: [
                { color: '#e85113' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -40 }
            ]
        }, {
            featureType: 'transit.station',
            stylers: [
                { weight: 9 },
                { hue: '#e85113' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'labels.icon',
            stylers: [
                { visibility: 'off' }
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [
                { lightness: 100 }
            ]
        }, {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [
                { lightness: -100 }
            ]
        }, {
            featureType: 'poi',
            elementType: 'geometry',
            stylers: [
                { visibility: 'on' },
                { color: '#f0e4d3' }
            ]
        }, {
            featureType: 'road.highway',
            elementType: 'geometry.fill',
            stylers: [
                { color: '#efe9e4' },
                { lightness: -25 }
            ]
        }
    ];

    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 51.054342, lng: 3.717424},
        zoom: 13,
        styles: styles,
        mapTypeControl: false
    });

    ko.applyBindings(new AppViewModel());
}


// This function populates the infowindow when the marker is clicked. We'll only allow
// one infowindow which will open at the marker that is clicked, and populate based
// on that markers position.
function populateInfoWindow(marker, infowindow) {
     // In case the status is OK, which means the pano was found, compute the
          // position of the streetview image, then calculate the heading, then get a
          // panorama from that and set the options
        function getContentForInfowindow(data, status) {
            if (status === google.maps.StreetViewStatus.OK) {
                var nearStreetViewLocation = data.location.latLng,
                    heading = google.maps.geometry.spherical.computeHeading(
                        nearStreetViewLocation,
                        marker.position
                    ),
                    panorama;
                currentContent += '<div class="infowindow-title">' + marker.title + '</div><div id="pano"></div>';
                panoramaOptions = {
                    position: nearStreetViewLocation,
                    pov: {
                        heading: heading,
                        pitch: 30
                    }
                };
                infowindow.setContent(currentContent + content);
                panorama = new google.maps.StreetViewPanorama(
                    document.getElementById('pano'),
                    panoramaOptions
                );
            } else {
                currentContent += '<div class="infowindow-title">' + marker.title + '</div>' +
                    '<div>No Street View Found</div>';
                infowindow.setContent(currentContent + content);
            }

        }
        // Check to make sure the infowindow is not already opened on this marker.
        if (infowindow.marker !== marker) {
        // Clear the infowindow content to give the streetview time to load.
        infowindow.setContent('');
        infowindow.marker = marker;
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick', function () {
            marker.setAnimation(null);
            infowindow.marker = null;
           
        });
        var streetViewService = new google.maps.StreetViewService(),
            radius = 50,
            content = '',
            currentContent = '',
            panoramaOptions,

            url = "https://api.nytimes.com/svc/search/v2/articlesearch.json",
            queryData = {
                'q' : marker.title,
                'api-key' : NYTApiKey
            };
       

        //get response from NYT
        $.getJSON(url, queryData, function (data) {
              //get articles
            var responseDoc = data.response.docs;
            //loop through the articles
            if (responseDoc.length !== 0) {
                content += "<div class='NYT-title'>New York Times articles about " + marker.title.toUpperCase() + ': </div><ul>';
                responseDoc.forEach(function (currentValue) {
                    //get URL, title and small intro for each article
                    var link = currentValue.web_url,
                        title = currentValue.headline.main,
                        //append to the document as an element of an unorder list
                        HTMLElement = '<li><a href="' + link + '" target="_blank">' + title + '</a></li>';
                    content += HTMLElement;
                });
                content += '</ul>';
            } else {
                content += "<div>No New York Times articles for " + marker.title.toUpperCase() + "</div>";
            }
        })
            .fail(function () {
                content += "<div>New York Times articles could not be loaded</div>";
            })
            .always(function () {
                // Use streetview service to get the closest streetview image within
                // 50 meters of the markers position
                streetViewService.getPanoramaByLocation(marker.position, radius, getContentForInfowindow);
            });
        // Open the infowindow on the correct marker.
        infowindow.open(map, marker);
    }
}

function error() {
  alert('Could not load Google Maps. Please try again later.')
}
