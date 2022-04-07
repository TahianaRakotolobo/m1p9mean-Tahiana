var express = require('express');
var bodyParser = require('body-parser');
var sha256 = require('js-sha256');
var User = require('./src/classes/User.js');
var Plate = require('./src/classes/Plate.js');
var environnement = require('./environnement/environnement.js');
var mongoClient = require('mongodb').MongoClient;
var app = express();

const hostname = '127.0.0.1';
const port = 3000;
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
    app.listen(3000, function(){
        console.log('Server running at http://'+ hostname + ':' + port + '/');
    });

    // ========================
    // Routes
    // ========================
    app.get('/', function(req, res){
        console.log("request on /");
    });

    app.post('/signup', function(req, res){
        if (!req.body.username) {
            return res.status(400).json({
                status: 'error',
                error: 'form cannot be empty',
            });
        }
        var newuser = new User(req.body.username, req.body.password, req.body.address, req.body.usertype);
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
            environnement.token = new User(result.name, result.password, result.address, result.usertype).createtoken(result.id);
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

    // -----------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------
    // ----------------------------- A revoir pour plusieurs plats en meme temps ---------------------------------------
    // -----------------------------------------------------------------------------------------------------------------
    // -----------------------------------------------------------------------------------------------------------------
    // passer une commande -> clients
    app.post('/order', function(req, res){
        let order = {
            idplate : Number(req.body.idplate),
            nb : req.body.nb,
            idclient : Number(req.body.idclient),
            date : new Date(),
            state : 'commande'
        };
        orderCollection.insertOne(order)
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
    app.get('/ordered', function(req, res){
        orderCollection.aggregate([
            { $lookup:
               {
                 from: 'plate',
                 localField: 'idplate',
                 foreignField: 'id',
                 as: 'orderdetails'
               }
            }
            ]).find(
            { $and: [
                { 'idclient' : Number(req.query.idclient) },
                { 'date': new Date() },
                { 'state': 'commande'}
            ]}
        ).toArray()
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
        var newplate = new Plate(req.body.name, req.body.price, req.body.benefits, true, Number(req.body.idresto));
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
            { 'idresto' : Number(req.query.idresto) },
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
                    visibility: {
                        $switch: [
                            { case: { $eq: [ "$visibility", true ]}, then: false },
                            { case: { $eq: [ "$visibility", false ]}, then: true }
                        ],
                        default: false
                    } 
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
    app.get('/ordered-resto', function(req, res){
        orderCollection.group(
            {
                key: { 'idclient': 1 },
                cond: { 
                    $and: [
                        { 'idresto' : Number(req.query.idresto) },
                        { 'date': new Date() },
                        { 'state' : 'commande' }
                    ]
                },
                reduce: function ( curr, result ) { },
                initial: { }
            }
        ).toArray()
        .then(plates => {
            res.status(200).json({
                status: 'success',
                data: plates,
            });
        })
        .catch(error => console.error(error));
    });

    // détails commandes -> restaurants
    app.get('/order-details', function(req, res){
        orderCollection.aggregate([
            { $lookup:
                {
                    from: 'plate',
                    localField: 'idplate',
                    foreignField: 'id',
                    as: 'orderdetails'
                }
            }
        ]).find(
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

    // changer l'état d'une commande à prêt à livrer -> restaurant
    app.put('/statechange-resto', function(req, res){
        orderCollection.findOneAndUpdate(
            { id: Number(req.body.id) },
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

    // bénéfices ->restaurants
    app.get('/benefits-resto', function(req, res){

    });

    // changer l'état d'une commande à en cours de livraison -> livreur
    app.put('/statechange-delivery', function(req, res){
        orderCollection.findOneAndUpdate(
            { id: Number(req.body.id) },
            {
                $set: {
                    state: 'en cours'
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
        .catch(error => console.error(error));
    });

    // changer l'état d'une commande à en livré -> livreur
    app.put('/statechange-delivered', function(req, res){
        orderCollection.findOneAndUpdate(
            { id: Number(req.body.id) },
            {
                $set: {
                    state: 'livre'
                }
            },
            {
                upsert: true
            }
        )
        .then(result => res.json('Success'))
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