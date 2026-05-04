//Express app
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./src/Routes/authRoutes');
const createRoutes = require('./src/Routes/createRoutes');
const updateRoutes = require('./src/Routes/updateRoutes');
const consultarRoutes = require('./src/Routes/consultarRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

//Routes
app.use('/api/auth',authRoutes);
app.use('/api/create', createRoutes);
app.use('/api/update',updateRoutes);
app.use('/api/retrieve', consultarRoutes);

//Listening
app.listen(PORT, () => {
    console.log('Server is running and ready to listen');
});
