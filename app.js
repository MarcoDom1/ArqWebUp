var express = require('express');
var app = express();

var db = {
  personas: [
    {id: 1 , value: 'OK'},
    {id: 7 , value: 'MAL'},
    {id: 3 , value: 'BIEN'},
  ],
  indicePersonas: {},
};

for (var i = 0; i < db.personas.length; i++) {
  var persona = db.personas[i];
  db.indicePersonas[persona.id] = i;

}

console.log(db.personas[db.indicePersonas[7]]);





app.get('/', function (req, res) {
  res.send('Bienvenidos');
});

//listo todas las personas
app.get('/personas', (req,res) => {

    res.send(db.personas);
  
})

//MUESTRO UN CLIENTE PARTICULAR
app.get('/personas/:id', (req,res) => {

  var persona = db.personas[db.indicePersonas[req.params.id]];
  
  if (persona === undefined) {

    res.status(404).send('Cliente no existe!');
    return;
  }

 res.send(persona);

});

//ELIMINO UN CLIENTE PARTICULAR
app.delete('/personas/:id', (req,res) => {
  var persona = db.personas[db.indicePersonas[req.params.id]];

  if (persona === undefined) {    
    res.status(404).send('Cliente no existe!');
  }
  db.personas.splice(db.indicePersonas[req.params.id],1);  
  delete(db.indicePersonas[req.params.id]);
  res.send('Cliente eliminado');

  return;

})

//AGREGO UN CLIENTE
app.post('/personas/:id/:value', (req,res) => {
  var persona = db.personas[db.indicePersonas[req.params.id]];

  if (persona === undefined) {    
    db.indicePersonas[req.params.id] =  db.personas.length ;
    db.personas[(db.personas.length )] =   { id: req.params.id, value: req.params.value }
    res.send('Agrego');
    return;
  }

  res.status(403).send('Cliente ya existe!');

  return;

})


//MODIFICO UN CLIENTE
app.patch('/personas/:id/:value', (req,res) => {
  var persona = db.personas[db.indicePersonas[req.params.id]];

  if (persona === undefined) {    
    res.status(404).send('Cliente no existe!');
    return;
  }
  db.personas[db.indicePersonas[req.params.id]] =   { id: req.params.id, value: req.params.value }

  res.send('Agrego');



  return;

})





app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});