var express = require('express');
var router = express.Router();



var personas = {    1:  'ok',
  2: 'mal',
  7: 'bien'};

console.log(personas[0]);




//listo todas las personas
router.get('/', (req,res) => {

    res.send(personas);
  
})

//MUESTRO UN CLIENTE PARTICULAR
router.get('/:id', (req,res) => {

  var persona = personas[req.params.id];
  
  if (persona === undefined) {
    res.send('No Existe');
    res.status(404)
    return;
  }
 res.send(persona);

});

//ELIMINO UN CLIENTE PARTICULAR
router.delete('/:id', (req,res) => {
  var persona = personas[req.params.id];

  if (persona === undefined) {    
      res.send('No Existe!');
  }
  delete(personas[req.params.id]);
  res.send('Cliente eliminado');

  return;

})

//AGREGO UN CLIENTE
router.post('/', (req,res) => {
  var persona =  personas[req.body.id];

  if (persona === undefined) {    
    personas[req.body.id] = req.body.value;
    res.send('Agregado');
    return;
  }
  res.send('Cliente ya existe');
  return;

})

//MODIFICO UN CLIENTE
router.patch('/', (req,res) => {
  var persona =  personas[req.body.id];

  if (persona === undefined) {    
    res.send('Cliente NO existe');
    return;
  }
  personas[req.body.id] = req.body.value;
  res.send('Cliente modificado exitosamente');


  return;

})
module.exports = router;