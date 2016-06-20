// pridanie serveru express
// @link: http://expressjs.com/
var express = require('express');

// pridanie template enginu handlebars
// @link: https://github.com/ericf/express-handlebars
var express_handlebars = require('express-handlebars');

// pridanie a nastavenie knex databázového wrapperu
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

// vytvorenie express inštancie
var app = express();

// pridanie handlebars ako view enginu pre express
app.engine('handlebars', express_handlebars({defaultLayout: 'main'}));

// nastavenie defaultného view enginu na handlebars
app.set('view engine', 'handlebars');

// pridanie middleware, vždy sa vykoná predtým než sa vykoná nasledujúce
app.use(function (req, res, next) {
    console.log(req.url);

    // spustí vykonanie nasledujúceho
    next();
});

// routa na /, teda hlavnú stránku
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

// routa na book/:id
app.get('/book/:id', function (req, res) {
    var id = req.params.id;

    knex.select('*').from('books').where('id', id).then(function (results) {
        res.render('book', {
            books: results
        });
        //res.json(results);
    }).catch(function (error) {
        console.log(error);
    });
});


// routa na book/:id/delete
app.get('/book/:id/delete', function (req, res) {
    var id = req.params.id;

    knex.delete().from('books').where('id', id).then(function (results) {
        res.redirect('/');
    }).catch(function (error) {
        console.log(error);
    });
});

// všetky predtým nehachytené routy, vhodné pre 404
app.get('*', function (req, res) {
    res.json(req.url);
});

// spustenie serveru na danom porte
var port = 8000;
app.listen(port, function () {
    console.log('App is listening on port ' + port + '!');
});

// v konzoli zapnúť pomocou node 'app.js', alebo 'nodemon app.js'
