import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import {GKEY} from '../apiKey.js'

var gKey = GKEY.KEY

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onGo = onGo

function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker({lat,lng}) {
    console.log('Adding a marker');
    mapService.addMarker({ lat, lng });
}

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(({coords:{latitude,longitude}}) => {
            // console.log('lat :',latitude);
            // console.log('lng :',longitude);
            onPanTo({lat:latitude,lng:longitude})
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo({lat,lng}) {
    console.log('Panning the Map');
    onAddMarker({lat,lng})
    mapService.panTo(lat, lng);
}

function onGo(ev, val) {
    ev.preventDefault()
    if (val === '') return
    const prm = askLocation(val)
    prm.then(res=>onPanTo(res))
}

function askLocation(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gKey}`)
    .then(res => res.data).then(res=>res.results[0].geometry.location)
}