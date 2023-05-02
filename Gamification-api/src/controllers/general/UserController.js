const conexion = require('./conexionDB')

const getSesionUser = async (req, res) => {
    const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE nik_name=$1 AND passworde = $2',[req.query.nik_name, req.query.passworde]);
    res.json(response.rows[0])
};

const saveUser = async (req, res) => {
    const response = await conexion.pool.query(
        'INSERT INTO control_usuarios.usuario(nombre, nik_name, apellido, passworde, id_rol) VALUES($1, $2, $3, $4, $5) RETURNING *',
        [req.body.nombre, req.body.nik_name, req.body.apellido, req.body.passworde, req.body.id_rol]
      );
    res.json(response.rows[0])
      
};

module.exports = {
    getSesionUser:getSesionUser,
    saveUser:saveUser
}