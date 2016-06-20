
var knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : '127.0.0.1',
        user     : 'root',
        password : 'root',
        database : 'node'
    }
});

knex.select().from('books').then(function (results) {
    
    })
    .catch(function (error) {

    });