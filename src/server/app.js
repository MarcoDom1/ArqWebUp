
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var persRouter = require('./routes/personas');
var app = express();
//var bodyParser = require('body-parser');

const BUILD_PATH = path.join(__dirname, '../..', 'build') ;
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));
//comentado porque no necesito se suba lo que estaba en la carpeta public
//(un html que dice hola epxress) 
app.use(express.static(BUILD_PATH));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/personas', persRouter);

//app.use(bodyParser.json());

//aggiungo per far accettare get di ogni possibile endpoint
/*app.get('/*', (req,res,next) => {
    res.sendFile(path.join(BUILD_PATH, 'index.html'))
});*/
module.exports = app;
