const express = require('express');
// const https = require('https');
const connectDB = require('./config/db');
// const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');
const mailConfiguration = require('./email-configuration/email-configuration')

const app = express();

// Connect Database
connectDB();

mailConfiguration();
// Init Middleware
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// // Define Routes
app.use('/prospect', require('./routes/api/prospect'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
})




