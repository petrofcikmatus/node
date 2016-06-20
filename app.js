// @link: http://expressjs.com/
var express = require('express');
var app = express();

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

app.get('/', function (request, response) {
    knex.select('*').from('books').then(function (results) {
        response.json(results);
    }).catch(function (error) {
        console.log(error);
    });
});

app.listen(8000, function () {
    console.log('Ecample app listening on port 8000!');
});



