/*const express = require('express');
const app = express();
const path = require('path');
const logger = require('morgan')
const cookieParser = require('cookie-parser');
const createError = require('http-errors');

/* DEFINIENDO RUTAS Y REQUIRIENDO */ /*
const routes = require('./src/routes/main');
const productsRoutes = require('./src/routes/products');
const usersRoutes = require('./src/routes/users');

app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
const methodOverride = require('method-override');
app.use(methodOverride  ('_method'));

const publicFolderPath = path.resolve(__dirname, "./public");
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use(express.urlencoded({extended: false }));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));


app.use('/main', routes);
app.use('/products', productsRoutes); 



module.exports= app; */