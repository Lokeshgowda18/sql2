const express = require('express');
const mysql = require('mysql2');

const app = express();

// ✅ Connect to the newly created 'busdb' schema
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'lokesh123',
    database: 'busbookingdb' // ← updated here
});

connection.connect((err) => {
    if (err) {
        console.log('Connection Error:', err);
        return;
    }
    console.log("Connected to 'busdb'");

    // ✅ Create Users Table
    const createUsersTable = `
        CREATE TABLE IF NOT EXISTS Users (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255)
        )`;

    // ✅ Create Buses Table
    const createBusesTable = `
        CREATE TABLE IF NOT EXISTS Buses (
            id INT AUTO_INCREMENT PRIMARY KEY,
            busNumber VARCHAR(255),
            totalSeats INT,
            availableSeats INT
        )`;

    // ✅ Create Bookings Table
    const createBookingsTable = `
        CREATE TABLE IF NOT EXISTS Bookings (
            id INT AUTO_INCREMENT PRIMARY KEY,
            seatNumber INT
        )`;

    // ✅ Create Payments Table
    const createPaymentsTable = `
        CREATE TABLE IF NOT EXISTS Payments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            amountPaid DECIMAL(10,2),
            paymentStatus VARCHAR(255)
        )`;

    // Execute all table creation queries
    connection.execute(createUsersTable, (err) => {
        if (err) return console.log("Users Table Error:", err);
        console.log("Users table created.");
    });

    connection.execute(createBusesTable, (err) => {
        if (err) return console.log("Buses Table Error:", err);
        console.log("Buses table created.");
    });

    connection.execute(createBookingsTable, (err) => {
        if (err) return console.log("Bookings Table Error:", err);
        console.log("Bookings table created.");
    });

    connection.execute(createPaymentsTable, (err) => {
        if (err) return console.log("Payments Table Error:", err);
        console.log("Payments table created.");
    });
});

// Basic route
app.get('/', (req, res) => {
    res.send('Bus Booking System API is running');
});

// Start the server
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});