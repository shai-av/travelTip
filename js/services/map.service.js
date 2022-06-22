import { locService } from './loc.service.js'
import {GKEY} from '../../apiKey.js'

export const mapService = {
    initMap,
    addMarker,
    panTo

}



var gKey = GKEY.KEY

var gMap;
// 'hh'
function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 15
            })
            console.log('Map!', gMap);

            gMap.addListener("click",(ev) => {
                // Close the current InfoWindow.
                let lat = ev.latLng.lat()
                let lng = ev.latLng.lng()
                let locName=prompt("do you want?")
                  if(locName) {locService.addLoc(locName,lat,lng)}
                  else {console.log('enter');}
                  

           }) 
})
}

function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    return marker;
}

function panTo(lat, lng) {
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    const API_KEY = gKey; //TODO: Enter your API Key
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}