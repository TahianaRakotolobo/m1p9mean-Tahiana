var express = require('express');
var bodyParser = require('body-parser');
var sha256 = require('js-sha256');
var User = require('./src/classes/User.js');
var Plate = require('./src/classes/Plate.js');
var utils = require('./src/utils.js');
var environnement = require('./environnement/environnement.js');
var mongoClient = require('mongodb').MongoClient;
var app = express();

const hostname = '127.0.0.1';
const port = process.env.PORT || 3000;
const connectionString = 'mongodb+srv://ekaly:mdpEkaly214@cluster0.rrybw.mongodb.net/m1p9mean-Tahiana?retryWrites=true&w=majority';

// mongoClient.connect(connectionString, {
//     useUnifiedTopology: true
//     }, (err, client) => {
//     if (err) return console.error(err);
//     console.log('Connected to Database');
// });

mongoClient.connect(connectionString, {
    useUnifiedTopology: true
})
.then(client => {  
    console.log('Connected to Database');   
    const db = client.db('m1p9mean-Tahiana');
    const userCollection = db.collection('user');
    const connectedCollection = db.collection('connected');
    const plateCollection = db.collection('plate');
    const orderCollection = db.collection('order');
    const deliveryCollection = db.collection('delivery');
    
    // ========================
    // Middlewares
    // ========================
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(function(req, res, next){
        res.setHeader('content-type', 'text/plain');

        // Website you wish to allow to connect
        res.setHeader('Access-Control-Allow-Origin', '*');

        // Request methods you wish to allow
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        // Request headers you wish to allow
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        // Set to true if you need the website to include cookies in the requests sent
        // to the API (e.g. in case you use sessions)
        res.setHeader('Access-Control-Allow-Credentials', true);
        // res.send(404, 'Page introuvable !');
        next();
    });
    
    // ========================
    // Listen
    // ========================
    app.listen(port, function(){
        console.log('Server running at http://'+ hostname + ':' + port + '/');
    });

    // ========================
    // Routes
    // ========================
    app.get('/', function(req, res){
        console.log("request on /");
        res.send("server is working");
    });

    app.post('/signup', function(req, res){
        if (!req.body.username) {
            return res.status(400).json({
                status: 'error',
                error: 'form cannot be empty',
            });
        }
        var newuser = new User(req.body.username, req.body.password, req.body.address, req.body.phone, req.body.usertype);
        userCollection.insertOne(newuser)
        .then(result => {
            console.log('Insertion réussie');
            // res.redirect('/');

            // saving the user
            userCollection.findOne({
                $and: [
                    { 'name' : newuser.name},
                    { 'password': newuser.password }
                ]
            })
            .then(result => {
                console.log('User connected');
                environnement.token = newuser.createtoken(result.id);
                environnement.currentuser = result.id;
                let userconnected = {
                    id : result.id,
                    token : environnement.token,
                    usertype : result.usertype,
                    date : new Date()
                }
                console.log(result.name);

                // insert the connected
                connectedCollection.insertOne(userconnected)
                .then(result => {
                    console.log('Insertion réussie');
                    // res.redirect('/');
                    res.status(200).json({
                        status: 'success',
                        data: userconnected,
                    });
                })
                .catch(error => {
                    console.error(error);
                    environnement.token = '';
                    environnement.currentuser = '';
                    res.status(300).json({
                        status: 'error',
                        data: req.body,
                    });
                });
            })
            .catch(error => console.error(error));

            // res.status(200).json({
            //     status: 'success',
            //     data: req.body,
            // });
        })
        .catch(error => console.error(error));
    });

    app.post('/signin', function(req, res){
        if (!req.body.username) {
            return res.status(400).json({
                status: 'error',
                error: 'form cannot be empty',
            });
        }
        userCollection.findOne({
            $and: [
                { 'name' : req.body.username},
                { 'password': sha256(req.body.password) }
            ]
        })
        .then(result => {
            environnement.token = new User(result.name, result.password, result.address, result.phone, result.usertype).createtoken(result.id);
            environnement.currentuser = result.id;
            // var currentdate = Date.now().toString();
            let userconnected = {
                id : result.id,
                token : environnement.token,
                usertype : result.usertype,
                date : new Date()
            }

            // insert the connected
            connectedCollection.insertOne(userconnected)
            .then(result => {
                console.log('Insertion réussie');
                res.status(200).json({
                    status: 'success',
                    data: userconnected,
                });
            })
            .catch(error => {
                console.error(error);
            });
        })
        .catch(error => {
            console.error(error);
            environnement.token = '';
            environnement.currentuser = '';
            res.status(300).json({
                status: 'error',
                data: req.body,
            });
        });
    });

    // liste des restaurants -> clients/administrateur
    app.get('/listeresto', function(req, res){
        userCollection.find(
            { 'usertype' : 'Restaurant' },
            { _id : 0, id : 1, name : 1, address : 1 }
        ).toArray()
        .then(restaurants => {
            res.status(200).json({
                status: 'success',
                data: restaurants,
            });
        })
        .catch(error => console.error(error));
    });

    // liste des plats visibles -> clients/restaurants/admin
    app.post('/menu', function(req, res){
        console.log('request on /menu');
        plateCollection.find(
            { $and: [
                { 'idresto' : Number(req.body.idresto) },
                { 'visibility': true }
            ]}
        ).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // passer une commande -> clients
    app.post('/order', function(req, res){
        var order = new Array();
        order = req.body.orders;
        const options = { ordered: true };

        orderCollection.insertMany(order, options)
        .then(result => {
            console.log('Insertion réussie');
            // res.redirect('/');

            res.status(200).json({
                status: 'success',
                data: result,
            });
        })
        .catch(error => console.error(error));
    });

    // liste des commandes passées en journée (+détails) -> clients
    app.post('/ordered', function(req, res){
        // console.log(Number(req.body.idclient));
        orderCollection.aggregate([
            { $lookup:
                {
                    from: 'plate',
                    localField: 'idplate',
                    foreignField: 'id',
                    as: 'orderdetails'
                }
            },
            { $match: 
                { 
                    'idclient' : Number(req.body.idclient), 
                    'state': 'commande' 
                }
            }
        ])
        .toArray()
        .then(plates => {
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // annuler une commande -> clients
    app.delete('/cancelorder', function(req, res){
        orderCollection.deleteOne(
            { id: req.body.Number(id) }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete');
            }
            res.json('Deleted Darth Vadar\'s quote');
        })
        .catch(error => console.error(error));
    });

    // nouveau plat -> restaurants
    app.post('/newplate', function(req, res){
        var newplate = new Plate(req.body.name, Number(req.body.price), Number(req.body.benefits), true, Number(req.body.idresto));
        plateCollection.insertOne(newplate)
        .then(result => {
            console.log('Insertion réussie');
            res.status(200).json({
                status: 'success',
                data: result
            });
        })
        .catch(error => console.error(error));
    });

    // fiche plat -> clients, restaurants
    app.get('/details', function(req, res){
        plateCollection.find(
            { 'id' : Number(req.query.id) }
        ).toArray()
        .then(plates => {
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // liste de tous les plats d'un restaurant -> restaurants
    app.post('/plates', function(req, res){
        plateCollection.find(
            { 'idresto' : Number(req.body.idresto) },
            { _id : 0, id : 1, name : 1, price : 1 , visibility : 1 }
        ).toArray()
        .then(plates => {
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // rendre un plat visible ou non -> restaurants
    app.put('/visibilitychange', function(req, res){
        plateCollection.findOneAndUpdate(
            { id: Number(req.body.id) },
            {
                $set: {
                    visibility: req.body.visibility
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
        .catch(error => console.error(error));
    });

    // liste des commandes des clients -> restaurants
    app.post('/ordered-resto', function(req, res){
        orderCollection.aggregate([
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $unwind: "$clientdetails" },
            { $match: { 'idresto' : Number(req.body.idresto), 'state' : 'commande' } },
            { $group: { _id: { "client": "$clientdetails" } } }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // détails commandes -> restaurants
    app.post('/order-details', function(req, res){
        console.log(req.body.idresto);
        console.log(req.body.idclient);
        orderCollection.aggregate([
            { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $unwind: "$clientdetails" },
            { $match: 
                { 
                    'idclient' : Number(req.body.idclient), 
                    'idresto' : Number(req.body.idresto), 
                    'state': 'commande' 
                }
            }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // changer l'état d'une commande à prêt à livrer -> restaurant
    app.put('/statechange-resto', function(req, res){
        orderCollection.updateMany(
            { idresto: Number(req.body.idresto), idclient: Number(req.body.idclient), state: 'commande' },
            {
                $set: {
                    state: 'pret'
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
        .catch(error => console.error(error));
    });

    // bénéfices -> restaurants
    app.post('/benefits-resto', function(req, res){
        var filtre = req.body.filtre;
        if(filtre == "plat"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'idresto' : Number(req.body.idresto), 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { "filtre": "$orderdetails.name" }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "jour"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'idresto' : Number(req.body.idresto), 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$dayOfMonth: { $toDate: "$date"} } }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "mois"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'idresto' : Number(req.body.idresto), 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$month: { $toDate: "$date"} } }, 
                        total:{ $sum: { $multiply: [ "$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "annee"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'idresto' : Number(req.body.idresto), 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$year: { $toDate: "$date"}} }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                } 
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        
    });

    // liste des commandes prêtes -> admin
    app.get('/readyorders', function(req, res){
        orderCollection.aggregate([
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $unwind: "$clientdetails" },
            { $lookup: { from: 'user', localField: 'idresto', foreignField: 'id', as: 'restodetails' } },
            { $unwind: "$restodetails" },
            { $match: { 'state' : 'pret' } },
            { $group: { _id: { "client": "$clientdetails", "resto": "$restodetails", "place" : "$place" } } }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // liste des livreurs -> admin
    app.get('/deliverymen', function(req, res){
        userCollection.aggregate([
            { $match: { 'usertype' : 'Livreur' } }
        ]).toArray()
        .then(user => {
            // console.log(user);
            res.status(200).json({
                status: 'success',
                data: user,
            });
        })
        .catch(error => console.error(error));
    });

    // nb commandes attribuées à un livreur -> admin
    app.post('/nborders', function(req, res){
        var nb = 0;
        orderCollection.aggregate([
            { $lookup: { from: 'delivery', localField: 'id', foreignField: 'idorder', as: 'attribution' } },
            { $match: { 'state' : 'a livrer', 'attribution.iddeliveryman' : req.body.iddeliveryman } },
            { $group: { _id: { "idclient": "$idclient", "idresto": "$idresto" } } },
            { $count: "iddeliveryman" }
        ]).toArray()
        .then(plates => {
            if(plates.length > 0){
                nb = plates[0].iddeliveryman;
            }
            // console.log(nb);
            res.status(200).json({
                status: 'success',
                data: nb,
            });
            
        })
        .catch(error => console.error(error));
    });

    // attribution d'une livraison -> admin
    app.post('/deliver', function(req, res){
        var order = new Array();
        const options = { ordered: true };
        orderCollection.aggregate([
            { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $unwind: "$clientdetails" },
            { $match: 
                { 
                    'idclient' : Number(req.body.idclient), 
                    'idresto' : Number(req.body.idresto), 
                    'state': 'pret' 
                }
            }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            order = utils.newDelivery(plates, Number(req.body.iddeliveryman));
            deliveryCollection.insertMany(order, options)
            .then(result => {
                console.log('Insertion réussie');
                orderCollection.updateMany(
                    { idresto: Number(req.body.idresto), idclient: Number(req.body.idclient), state: 'pret' },
                    {
                        $set: {
                            state: 'a livrer'
                        }
                    },
                    {
                        upsert: true
                    }
                )
                .then(resultdata => res.json('Success'))
                .catch(error => console.error(error));
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    });

    // bénéfices -> admin
    app.post('/benefits-admin', function(req, res){
        var filtre = req.body.filtre;
        if(filtre == "plat"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { "filtre": "$orderdetails.name" }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "jour"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$dayOfMonth: { $toDate: "$date"} } }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "mois"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$month: { $toDate: "$date"} } }, 
                        total:{ $sum: { $multiply: [ "$orderdetails.benefits", "$nb"] } } 
                    } 
                }
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "annee"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $match: { 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: {$year: { $toDate: "$date"}} }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                } 
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
        if(filtre == "resto"){
            orderCollection.aggregate([
                { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
                { $unwind: "$orderdetails" },
                { $lookup: { from: 'user', localField: 'idresto', foreignField: 'id', as: 'restodetails' } },
                { $unwind: "$restodetails" },
                { $match: { 'state' : 'livre' } },
                { $group: 
                    { 
                        _id: { filtre: "$restodetails.name" }, 
                        total:{ $sum: { $multiply: ["$orderdetails.benefits", "$nb"] } } 
                    } 
                } 
            ]).toArray()
            .then(plates => {
                console.log(plates);
                res.status(200).json({
                    status: 'success',
                    data: plates,
                });
            })
            .catch(error => console.error(error));
        }
    });

    // liste commandes à livrer -> livreur
    app.post('/ordered-resto-client', function(req, res){
        orderCollection.aggregate([
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $unwind: "$clientdetails" },
            { $lookup: { from: 'user', localField: 'idresto', foreignField: 'id', as: 'restodetails' } },
            { $unwind: "$restodetails" },
            { $lookup: { from: 'delivery', localField: 'id', foreignField: 'idorder', as: 'deliverydetails' } },
            { $unwind: "$deliverydetails" },
            { $match: { 'deliverydetails.iddeliveryman' : Number(req.body.iddeliveryman), $or: [{'state' : 'a livrer'}, {'state' : 'en cours'}] } },
            { $group: { _id: { "client": "$clientdetails", "resto": "$restodetails", "delivery": "$deliverydetails" } } }
        ]).toArray()
        .then(plates => {
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // détails commandes -> livreurs
    app.post('/order-details-delivery', function(req, res){
        orderCollection.aggregate([
            { $lookup: { from: 'plate', localField: 'idplate', foreignField: 'id', as: 'orderdetails' } },
            { $lookup: { from: 'user', localField: 'idclient', foreignField: 'id', as: 'clientdetails' } },
            { $lookup: { from: 'user', localField: 'idresto', foreignField: 'id', as: 'restodetails' } },
            { $lookup: { from: 'delivery', localField: 'id', foreignField: 'idorder', as: 'deliverydetails' } },
            { $match: 
                { 
                    'idclient' : Number(req.body.idclient), 
                    'idresto' : Number(req.body.idresto), 
                    $or: [{'state' : 'a livrer'}, {'state' : 'en cours'}] 
                }
            }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // changer l'état d'une commande à en cours de livraison ou livrée -> livreur
    app.put('/statechange-delivery', function(req, res){
        orderCollection.updateMany(
            { idresto: Number(req.body.idresto), idclient: Number(req.body.idclient), $or: [{'state' : 'a livrer'}, {'state' : 'en cours'}] },
            {
                $set: {
                    state: req.body.state
                }
            },
            {
                upsert: true
            }
        )
        .then(result => {
            res.json('Success');
        })
        .catch(error => console.error(error));
    });

    app.post('/research', function(req, res){
        plateCollection.aggregate([
            {
                $match: 
                {
                    "name": req.body.word,
                    "visibility" : true 
                }
            }
        ]).toArray()
        .then(plates => {
            // console.log(plates);
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // déconnexion
    app.delete('/logout', function(req, res){
        connectedCollection.deleteOne(
            { id: Number(req.body.id) }
        )
        .then(result => {
            if (result.deletedCount === 0) {
                return res.json('No quote to delete');
            }
            res.json('Deleted Darth Vadar\'s quote');
            db.close();
        })
        .catch(error => console.error(error));
    });
})
.catch(console.error);