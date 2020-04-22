var express = require('express');
var path = require('path');
var fs = require('fs');
var mediaserver = require('mediaserver');

var app = express();

app.use(express.static('public'));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules', 'jquery', 'dist')));

//Ruta para el home
app.get('/', (req, res)=> {
    res.sendFile(path.join(__dirname, '/index.html'));
});

//Creamos una nueva ruta
app.get('/canciones', (req, res)=>{
    fs.readFile(path.join(__dirname, 'canciones.json'), 'utf8', (error, canciones)=>{
        //Si hay un error mostramos el error en la consola
        if(error) throw error;
        res.json(JSON.parse(canciones));
    })
});

//Creamos una nueva ruta para enviar las canciones al reproductor
app.get('/canciones/:nombre', (req, res)=> {
    var cancion = path.join(__dirname, 'canciones', req.params.nombre);
    console.log(req.params.nombre);
    mediaserver.pipe(req, res, cancion);
})


app.listen(3000, ()=> {
    console.log('Aplicacion corriendo');
})