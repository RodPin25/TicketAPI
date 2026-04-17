//Express app
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./src/Routes/authRoutes');
const createRoutes = require('./src/Routes/createRoutes');

dotenv.config();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/create', createRoutes);

//Listening
app.listen(PORT, () => {
    console.log('Server is running and ready to listen');
});
