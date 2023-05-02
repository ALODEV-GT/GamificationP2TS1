const conexion = require('./conexionDB')

const getRoles = async (req, res) => {
    const response = await conexion.pool.query('SELECT * FROM control_usuarios.rol');
    res.json(response.rows)
};

module.exports = {
    getRoles:getRoles
}