// @link: http://expressjs.com/
var express = require('express');

// @link: https://github.com/ericf/express-handlebars
var express_handlebars = require('express-handlebars');

// @link: http://knexjs.org/
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: 'root',
        database: 'node'
    }
});

var app = express();

app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(function (req, res, next) {
    console.log(req.url);
    next();
});

app.get('/', function (req, res) {
    knex.select('*').from('books').then(function (results) {
        res.render('home', {
            books: results
        });
        //res.json(results);
    }).catch(function (error) {
        console.log(error);
    });
});

app.get('/book/:id', function (req, res) {
    var id = req.params.id;

    knex.select('*').from('books').where('id', id).then(function (results) {
        res.render('home', {
            books: results
        });
        //res.json(results);
    }).catch(function (error) {
        console.log(error);
    });
});

app.get('*', function (req, res) {
    res.json(req.url);
});

app.listen(8000, function () {
    console.log('Example app listening on port 8000!');
});



