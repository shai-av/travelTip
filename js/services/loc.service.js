

import { utilService } from "./util.js";
import { appController } from "../app.controller.js";

export const locService = {
    getLocs,
    addLoc,
    deleteLoc
}

const STORAGE_KEY = 'locsDB'

function addLoc(name, lat, lng) {

    locs.push({
        id: utilService.makeId(),
        name,
        lat,
        lng,
    })
    saveLocs()
    appController.renderTable()
}


const locs=(loadLocs()) ? loadLocs() : []

// const locs = (loadLocs()) ? loadLocs() : [
//     { id: 1, name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
//     { id: 2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
// ]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 0)
    });
}

function deleteLoc(id) {
    const locIdx = locs.findIndex((loc) => loc.id === id)
    locs.splice(locIdx, 1)
    saveLocs()
}

function saveLocs() {
    utilService.saveToStorage(STORAGE_KEY, locs)
}

function loadLocs() {
    return utilService.loadFromStorage(STORAGE_KEY)
}