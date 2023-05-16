const conexion = require('./conexionDB')

const getSesionUser = async (req, res) => {
  const { nik_name, passworde } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE nik_name=$1 AND passworde = $2', [nik_name, passworde]);
  res.json(response.rows[0])
};

const saveUser = async (req, res) => {
  const { nombre, nik_name, apellido, passworde, rol } = req.body;
  const response = await conexion.pool.query(
    'INSERT INTO control_usuarios.usuario(nombre, nik_name, apellido, passworde, id_rol) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [nombre, nik_name, apellido, passworde, rol]
  );
  res.json(response.rows[0])

};

const validateUser = async (req, res) => {
  const { nik_name } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE nik_name=$1', [nik_name]);
  res.json(response.rows[0])
}

module.exports = {
  getSesionUser: getSesionUser,
  saveUser: saveUser,
  validateUser: validateUser
}
