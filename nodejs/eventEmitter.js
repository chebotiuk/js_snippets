// Подключаем модуль Event
var EventEmitter = require('events').EventEmitter;
var server = new EventEmitter;

// Объявили событие, обе функции работают в связке, обрабатываются друг за другом
server.on('request', function(request){
	request.approved = true;
});
server.on('request', function(request){
	console.log(request);
});

// .emit инициализирует событие
server.emit('request', {from: "Клиент"});
server.emit('request', {from: "Еще клиент"});

console.log(server);
