// Import the express module 
import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';

//Load environment variables from.env
dotenv.config();
console.log(process.env.DB_HOST);

// Create an express application 
const app = express();

// Define a port number where server will listen
const PORT = 3000;

// Enable static file serving
app.use(express.static('public'));

// set ejs as the view 
app.set('view engine', 'ejs');

// Middleware that allows express to read 
// form data and store it in req.body
app.use(express.urlencoded({extended: true}));

// create a temp array to store orders
const orders = [];

// Create a pool (bucket) of database connections
const pool = mysql2.createPool({
    host: process.env.DB_HOST,
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
}).promise();

// Database test route
app.get('/db-test', async(req, res) => {

    try {
        const pizza_orders = await pool.query('SELECT * FROM orders');
        res.send(pizza_orders[0]);
    } catch(err) {
        console.error('Database error: ', err);

    }

}); 

// Define our main route ('/')
app.get('/', (req, res) => {
    res.render('home')
});



// Contact route
app.get('/contact-us', (req, res) => {
   // res.sendFile(`${import.meta.dirname}/views/contact.html`);
   res.render('contact')
});


// Confirmation route
app.get('/Thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

// submit order route
app.post('/submit-order', (req, res) => {

    // Create a JSON object to store the order data
    const order = {
        fname: req.body.fname,
        lname: req.body.lname,
        email: req.body.email,
        Toppings:req.body.Toppings ? req.body.Toppings : "none" ,
        size: req.body.size,
        comment:req.body.comment,
        timestamp: new Date()

    };

    // Add order object to orders array
    orders.push(order);

    // res.sendFile(`${import.meta.dirname}/views/confirmation.html`);

    // render confirmation page
     res.render('confirmation', { order });

});


 // Confirmation route
app.get('/Thank-you', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

 // Admin route
app.get('/admin', (req, res) => {
    res.send(orders);
});
    


// Start server and listen on designated port
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});