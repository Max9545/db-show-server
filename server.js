const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
const port = 3001; // You can choose any port you want

// MySQL Connection Pool
const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'comedyworks.com',
    port: '3306',
    user: 'read',
    password: 'XY9E3cBtBz3e5qakLLwa',
    database: 'comedyworks_production' // Replace with your database name
});

// Enable CORS
app.use(cors());

// API endpoint to fetch comedians
app.get('/comedians', (req, res) => {
    // Query to fetch comedians
    const query = "SELECT id, first_name, last_name FROM comedians LIMIT 20";

    // Execute the query
    pool.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: error.message });
            return;
        }
        res.json(results);
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
