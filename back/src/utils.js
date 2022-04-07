const environnement = require('./../environnement/environnement');
function getNb(phrase){
    let words = phrase.split(" ");
    var listenb = [];
    var j = 0;
    for (var i = 0; i < words.length; i++) {
        if(isNaN(words[i]) == false){
            listenb[j] = Number(words[i]);
            j++;
        }
    }
    return listenb;
}

function geoFind(callback) {
    function success(position) {
        const latitude  = position.coords.latitude;
        const longitude = position.coords.longitude;
        callback(null, position);
    } 

    function error() {
        var err = 'Unable to retrieve your location';
        console.log(err);
        callback(err);
    }

    if (!navigator.geolocation) {
        console.log('Geolocation is not supported by your browser');
    } else {
        console.log('Locating…');
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

module.exports = { getNb, geoFind };