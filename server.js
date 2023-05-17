const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();

//const db = require('./config/db.config')
const registrationController = require('./controllers/registrationController');
const validateRegistration = require('./middleware/validateRegisteration')
const connString = process.env.CONN_STRING;

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));

//parse requests 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const client = new Client(connString);

client.connect((err) => {
    if (err) {
        console.error('Error connecting to the database: ', err);
        process.exit(1); // Terminate the connection
    }
    console.log('Connected to the database');
})

app.get('/', (req, res) => {
    res.json({ message: 'Welcome to NodeJS API.'})
})

app.post('/register', validateRegistration(client), registrationController(client).registerUser);

//app.get('/users', db.getUsers)

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
