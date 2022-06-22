
export const utilService = {
    makeId,
    saveToStorage,
    loadFromStorage,
}


function makeId(length = 5) {
    var txt = ''
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }

  function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}


function loadFromStorage(key) {
  const json = localStorage.getItem(key)
  return JSON.parse(json)
}
  