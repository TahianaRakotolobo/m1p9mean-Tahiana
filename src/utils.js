const environnement = require('./../environnement/environnement');
const Delivery = require('./classes/Delivery');
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

function newDelivery(orders, iddeliveryman){
    var deliveries = new Array();
    for(var i = 0; i<orders.length; i++){
        deliveries[i] = new Delivery(orders[i].id, iddeliveryman);
    }
    return deliveries;
}

module.exports = { getNb, newDelivery };