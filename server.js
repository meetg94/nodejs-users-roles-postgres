const express = require('express');
const cors = require('cors');
const { Client } = require('pg');
require('dotenv').config();


const registrationController = require('./controllers/registrationController');
const validateRegistration = require('./middleware/validateRegisteration');
const signInController = require('./controllers/signInController');
const JWTAuth = require('./middleware/JWTAuth');
const allItemsController = require('./controllers/allItemsController');
const adminMiddleware = require('./middleware/adminMiddleware');
const createItemsController = require('./controllers/createItemsController');
const connString = process.env.CONN_STRING;

const app = express();

app.use(cors());

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
//Registration Route
app.post('/register', validateRegistration(client), registrationController(client).registerUser);
//Login Route
app.post('/signin', signInController(client).signInUser);

//Get all electronics items list
app.get('/all_items', JWTAuth, allItemsController(client).getAllItems);

//Only admin can create new items middleware will check for admin role
app.post('/create_item', JWTAuth, adminMiddleware, createItemsController(client).createItem);
const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
