const express = require('express');
const app = express();
const path = require('path');

const publicFolderPath = path.resolve(__dirname, "./public");
app.use(express.static(publicFolderPath));

app.listen(3000, () => console.log('Servidor corriendo en puerto 3000'));

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, './views/home.html')));
app.get('/login', (req, res) => res.sendFile(path.resolve(__dirname, './views/login.html')));
app.get('/register', (req, res) => res.sendFile(path.resolve(__dirname, './views/register.html')));
app.get('/cart', (req, res) => res.sendFile(path.resolve(__dirname, './views/productCart.html')));
app.get('/detail', (req, res) => res.sendFile(path.resolve(__dirname, './views/productDetail.html')));