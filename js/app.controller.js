import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import {GKEY} from '../apiKey.js'

export const appController = {
    renderTable,
}

var gKey = GKEY.KEY

window.onload = onInit
window.onAddMarker = onAddMarker
window.onPanTo = onPanTo
window.onGetUserPos = onGetUserPos
window.onDelete = onDelete
window.onGo = onGo
window.onLocClk = onLocClk
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

function onAddMarker({lat,lng}) {
    console.log('Adding a marker');
    mapService.addMarker({ lat, lng });
}

function onGetUserPos() {
    getPosition()
        .then(({coords:{latitude,longitude}}) => {
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
    prm.then(res=>onPanTo(res.results[0].geometry.location))
}

function askLocation(address) {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${gKey}`).then(res => res.data)
}

function onDelete(id){
    locService.deleteLoc(id)
    renderTable()
}

function renderTable() {
locService.getLocs().then(locs=> {
    var strsHtml = locs.map(loc => {
        return `<article class="loc-card">
        <h1 class="name">${loc.name} 
        <button onclick="onLocClk(${loc.lat},${loc.lng})">go</button>
        <button onclick="onDelete('${loc.id}')"</button>delete</h1>
    </article>`})
    document.querySelector('.locs').innerHTML = strsHtml.join('')
})
}

function onLocClk(lat,lng){
onPanTo({lat,lng})
}