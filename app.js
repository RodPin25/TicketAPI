//Express app
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/Routes/authRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Routes
app.use('/api/auth',authRoutes);

//Listening
app.listen(PORT, () => {
    console.log('Server is running and ready to listen');
});
