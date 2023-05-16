const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: 'SPG4320alonzo',
    database: 'gamication',
    port: '5432'
});

module.exports={
    pool:pool
}
