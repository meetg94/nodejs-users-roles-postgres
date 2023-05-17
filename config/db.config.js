const pg = require('pg');
require('dotenv').config();

const connString = process.env.CONN_STRING;
const client = new pg.Client(connString);

client.connect();

const getUsers = (req, res) => {
    client.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
}

module.exports = {
    getUsers
}