//const puppeteer = require('puppeteer');
var express = require('express');

var app = express();
var PUERTO = process.env.PORT || 3000;
var servidor = app.listen(PUERTO);
app.use(express.static('public'));

var socket = require('socket.io');
var io = socket(servidor);
io.on('connection', nuevaConeccion);

function nuevaConeccion(socket){
    console.log('nueva coneccion: '+ socket.id);
    socket.on('triangulos', enviarData);
    function enviarData(data){
        io.sockets.emit('triangulos', data);
        console.log('servidor recibe y envia triangulos');
    }
    socket.on('pixels', enviarPixels);
    function enviarPixels(data){
        io.sockets.emit('pixels', data);
        console.log('servidor recibe y envia pixels');
    }
    socket.on('atractor', enviarAtractor);
    function enviarAtractor(data){
        io.sockets.emit('atractor', data);
        console.log('servidor recibe y envia atractor');
    }
}
