const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors'); // ✅ Step 1: Import cors

const app = express();

app.use(cors()); // ✅ Step 2: Enable CORS for all routes
app.use(bodyParser.json());

app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));

module.exports = app;
