// on importe

const express = require('express'); 
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const Product = require('./models/Product');

 // on appelle la methode express ce qui permet de créer une appli express
const app = express();


app.use(express.json()); // intercepte toutes les req qui continne du json et met a dispo ds rec.body comme body.parser



mongoose.connect('mongodb+srv://admin:admin@fullstack.taag4.mongodb.net/quizz?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

 

// va permettre a l appli d'acceder a API
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(bodyParser.json());

// ajouté pour enregistrement des things
  app.post('/api/products', (req, res, next) => {
    const product = new Product({
      ...req.body
    });

    /* Enregistrement des Things dans la base de donnée */
    product.save()
    .then(() => res.status(201).json({ product }))
    .catch(error => res.status(400).json({ error }));
  });

   /* Récupération d'un Things spécifique */
   app.get('/api/products/:id', (req, res, next) => {
    Product.findOne({ _id: req.params.id })
      .then(product => res.status(200).json({ product }))
      .catch(error => res.status(404).json({ error }));
  });

    /* Modification d'un Thing enregistré */
  app.put('/api/products/:id', (req, res, next) => {
    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });

  /* Suppression d'un objet enregistré */
  app.delete('/api/products/:id', (req, res, next) => {
    Product.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Deleted !'}))
      .catch(error => res.status(400).json({ error }));
  });

  /* Récupération de la liste Things en vente */
    app.use('/api/products', (req, res, next) => {
      Product.find()
        .then(products => res.status(200).json({ products }))
        .catch(error => res.status(400).json({ error }));
    });

  



  

module.exports = app; // on exporte pour que l on puisse y acceder depuis les autres fichiers de notre projet notament notre server node

