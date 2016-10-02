var path = require('path');

module.exports = function (app, express) {
    app.use(express.static(__dirname +  '/'));

    app.use(express.static(__dirname +  '/dist/prod/'));

    app.get('/', function (req, res) {
        return res.sendFile(path.join(__dirname + '/dev/index.html'));
    });

}
