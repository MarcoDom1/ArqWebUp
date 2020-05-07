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

  db.indicePersonas[persona.id] = persona;
}

app.get('/', function (req, res) {
  res.send('Bienvenidos');
});

//listo todas las personas
app.get('/personas', (req,res) => {
  for (var i = 0; i < db.personas.length; i++) {
    res.send(db.personas);
  }
})

//MUESTRO UN CLIENTE PARTICULAR
app.get('/personas/:id', (req,res) => {
  var persona = db.indicePersonas[req.params.id];
  
  if (persona === undefined) {
    res.send('No Existe');
    return;
  }
  res.send(persona.id + ' ' + persona.value);

});

//ELIMINO UN CLIENTE PARTICULAR
app.delete('/personas/:id', (req,res) => {
  var persona = db.indicePersonas[req.params.id];

  if (persona === undefined) {    
      res.send('No Existe!');

  }

  db.personas.splice(db.indicePersonas[req.params.id],1);
  
  console.log(db.indicePersonas[req.params.id]);
  //FALTA ELIMINAR LA PERSONA
  return;
})


app.listen(3000, function () {
 console.log('Example app listening on port 3000!');
});