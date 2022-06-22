import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import {GKEY} from '../apiKey.js'

export const appController = {
    renderTable,
}

var gKey = GKEY.KEY

window.onload = onInit;
window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;


function onInit() {
    mapService.initMap()
        .then(() => {
            console.log('Map is ready');
            renderTable() })
        .catch(() => console.log('Error: cannot init map'));
        
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function onAddMarker() {
    console.log('Adding a marker');
    mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
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
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo() {
    console.log('Panning the Map');
    mapService.panTo(35.6895, 139.6917);
}

function onGo(ev, val) {
    ev.preventDefault()
    if (val === '') return
    const prm = askLocation(val)
    prm.then(res=>console.log(res))
}

function askLocation(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gKey}`).then(res => res.data)
}



function renderTable() {
locService.getLocs().then(locs=> {
    var strsHtml = locs.map(loc => {
        return `<article class="loc-card">
        <h1 class="name">${loc.name} 
        <button onclick="onPanTo(${loc.lat,loc.lng})">go</button>
        <button onclick="onDelete(${loc.id})"</button>delete</h1>
    </article>`})
    document.querySelector('.locs').innerHTML = strsHtml.join('')
})
}
