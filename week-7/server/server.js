//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const zod = require('zod');
const adminRoutes = require('./routes/admin.route.js')
const userRoutes = require('./routes/user.route.js');
dotenv.config();
const app = express();
exports.app = app;

app.use(express.json());

const secret = process.env.JWT_SECRERT;  // This should be in an environment variable in a real application
const port = process.env.PORT;

// Connect to MongoDB
mongoose.connect(process.env.DB_URL); 

app.use('/admin',adminRoutes);
app.use('/users',userRoutes);

app.listen(port, () => {
    console.log('Server is listening on port 3000');
});