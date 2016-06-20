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

app.get('/', function (request, response) {
    knex.select('*').from('books').then(function (results) {
        response.render('home');
        //response.json(results);
    }).catch(function (error) {
        console.log(error);
    });
});

app.listen(8000, function () {
    console.log('Ecample app listening on port 8000!');
});



