var http = require('http');
var path = require('path');
var express = require('express');
var config = require('config');

var log = require('libs/logger')(module);
var hb = require('express-handlebars');
var HttpError = require('error').HttpError;
var sendHttpError = require('middleware/sendHttpError');
var loadUser = require('middleware/loadUser');
var routes = require('routes');
var sessionStore = require('libs/sessionStore');
var socket = require('socket');

var app = express();

// view engine setting
app.engine('hb', hb({
  extname: 'hb',
  defaultLayout: 'index',
  layoutsDir: __dirname + '/views/layouts/'
}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hb');

app.use(express.favicon()); // устанавливает favicon.ico

if (app.get('env') == 'development') { // выводит инфо о запросе
  app.use(express.logger('dev'));
} else {
  app.use(express.logger('default'));
}

app.use(express.bodyParser()); // разбирает тело запроса из POST, парсит в req.body

app.use(express.cookieParser('your secret here')); // req.headers.cookie -> req.cookie

app.use(express.session({
  secret: config.get('session:secret'),
  key: config.get('session:key'),
  cookie: config.get('session:cookie'),
  store: sessionStore
}));

app.use(function(req, res, next) {
  req.session.numberOfVisits = req.session.numberOfVisits + 1 || 1;
  next()
})

app.use(sendHttpError)
app.use(loadUser)

app.use(app.router); // как обрабатывать запросы

routes(app);

app.use(express.static(path.join(__dirname, 'public'))); // отдает статические файлы (из public), если ничего не было найдено выше 

app.use(function(err, req, res, next) {
  if (err instanceof HttpError) {
    res.sendHttpError(err);
  } else {
    if (app.get('env') === 'development') {
      var errorHandler = express.errorHandler();
      errorHandler(err, req, res, next);
    } else {
      log.error(err)
      err = new HttpError(500);
      res.sendHttpError(err);
    }
  }
})

var server = http.createServer(app)
  .listen(config.get('port'), function() {
    log.info('Express server listening on port ' + config.get('port'));
  });

var io = socket(server);
app.set('io', io); // we can get it via req.app.get('io')
