const { en } = require('@faker-js/faker');
const SQL = require('mssql');

require('dotenv').config();

const config = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    server: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    database: process.env.DB_NAME,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

const PoolPromise =  new SQL.ConnectionPool(config).connect().then(pool =>{
    console.log('[INFO] Database connected successfully');
    return pool;
}).catch(err => {
    console.error('[ERROR] Database connection failed: ', err);
});

module.exports = {
    SQL,PoolPromise
}; 