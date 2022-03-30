const express = require('express');
const app = express();
const path = require('path');
const routes = require('./src/routes/main');
const productsRoutes = require('./src/routes/products');
const usersRoutes = require('./src/routes/users');

const methodOverride = require('method-override');
app.use(methodOverride  ('_method'));

const publicFolderPath = path.resolve(__dirname, "./public");
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));

/*
app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/home.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/cart', (req, res) => res.sendFile(path.resolve(__dirname, './views/productCart.html')));
app.get('/detail', (req, res) => res.sendFile(path.resolve(__dirname, './views/productDetail.html'))); */

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.use('/main', routes);



module.exports= app;