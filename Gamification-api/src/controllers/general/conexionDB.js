const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '',
    database: 'gamication',
    port: '5432'
});

module.exports={
    pool:pool
}
