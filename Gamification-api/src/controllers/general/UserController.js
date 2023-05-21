const conexion = require('./conexionDB')

const getSesionUser = async (req, res) => {
  const { usuario, contrasena } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE usuario=$1 AND contrasena = $2', [usuario, contrasena]);
  res.json(response.rows[0])
};

const getUsuarioById = async (req, res) => {
  const { id_usuario } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE id_usuario=$1 ', [id_usuario]);
  res.json(response.rows[0])
};

const saveUser = async (req, res) => {
  const { nombre, usuario, apellido, contrasena, rol } = req.body;
  const response = await conexion.pool.query(
    'INSERT INTO control_usuarios.usuario(nombre, usuario, apellido, contrasena, id_rol) VALUES($1, $2, $3, $4, $5) RETURNING *',
    [nombre, usuario, apellido, contrasena, rol]
  );
  res.json(response.rows[0])

};

const validateUser = async (req, res) => {
  const { usuario } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_usuarios.usuario WHERE usuario=$1', [usuario]);
  res.json(response.rows[0])
}

module.exports = {
  getSesionUser: getSesionUser,
  saveUser: saveUser,
  validateUser: validateUser,
  getUsuarioById: getUsuarioById
}
