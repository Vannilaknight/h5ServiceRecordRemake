var magicbus = require('@leisurelink/magicbus');

module.exports = function(config, io) {

    var broker = magicbus.createBroker('h5', 'record', 'amqp://docker.dev:5672/');

    var subscriber = magicbus.createSubscriber(broker);

    subscriber.on('h5.player-update', function(eventName, data, rawMessage) {
        console.log(data);
        io.emit('player-update', data)
    });

    subscriber.on('h5.no-change', function(eventName, data, rawMessage) {
        console.log(data);
    });

    subscriber.startSubscription();
};