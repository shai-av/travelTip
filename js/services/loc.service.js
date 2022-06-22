

import { utilService } from "./util.js";

export const locService = {
    getLocs,
    addLoc
}

const STORAGE_KEY='locsDB'

function addLoc(name,lat,lng) {
    
    locs.push({
        id: utilService.makeId(),
        name,
        lat,
        lng,
    })
    utilService.saveToStorage(STORAGE_KEY,locs)
}

const locs = [
    {id:1, name: 'Greatplace', lat: 32.047104, lng: 34.832384 }, 
    {id:2, name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(locs);
        }, 2000)
    });
}


