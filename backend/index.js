'use strict';

var express = require('express');
var kraken = require('kraken-js');

var options, app;

options = {
    onconfig: function (config, next) {
        next(null, config);
    },
};

// var kraken = require('kraken-js'),
//     app = require('express')(),
//     options = {
//         onconfig: function (config, next) {
//             next(null, config);
//         },
//     },
//     port = process.env.PORT || 3000;

// app.use(kraken(options));

app = module.exports = express();
app.use(kraken(options));
// app.use(express.json());

// app.listen(port, function() {
//     console.log('[%s] Servidor iniciado em http://localhost:%d', app.settings.env, port);
// })
app.on('start', function () {
    console.log('Application ready to serve requests.');
    console.log('Environment: %s', app.kraken.get('env:env'));
});
