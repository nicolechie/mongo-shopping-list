var Item = require('../models/item');

exports.save = function(name, callback, errback) {
    Item.create({ name: name }, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        callback(item);
    });
};

exports.list = function(callback, errback) {
    Item.find(function(err, items) {
        if (err) {
            errback(err);
            return;
        }
        callback(items);
    });
};

exports.destroy = function(id, callback, errback) {
    // console.log(id);
    Item.remove({_id:id}, function(err) {
        if (err) {
            errback(err);
            return;
        }
        callback("successful");
    });
};

exports.edit = function(item, callback, errback) {
    var query = {_id : item.id}
    // console.log(item);
    Item.update(query, {name : item.name}, function(err, item) {
        if (err) {
            errback(err);
            return;
        }
        console.log("The Update Item", item);
        callback(item);
    });
};