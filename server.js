var express = require('express');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var User = function() {
    this.storage = storage;
}

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');


Storage.prototype.delete = function(id) {
  return this.items.splice(id, 1);
};

Storage.prototype.update = function(id, newName) {
    this.items[id].name = newName;
    return this.items;
};

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res) { 
    var id = req.params.id;
    var item = storage.delete({'id':id});
    res.status(201).json(item);
});

app.put('/items/:id', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }
    var id = req.params.id;
    var name = req.body.name;
    console.log(req.body.name);
    var item = storage.update(id, name);
    res.status(201).json(item);
});


app.listen(process.env.PORT || 8080);