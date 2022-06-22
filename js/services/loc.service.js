import { utilService } from "./util.js";

export const locService = {
    getLocs
}



function addLoc(lat,l) {
    locs.push({
        id: utilService.makeId(),


    })
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


