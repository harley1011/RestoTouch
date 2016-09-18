var path = require('path');

module.exports = function (app, express) {
    app.use(express.static(__dirname +  '/'));

    app.use(express.static(__dirname +  '/dist/dev/'));

    app.get('/', function (req, res) {
        return res.sendFile(path.join(__dirname + '/dist/dev/index.html'));
    });

}
