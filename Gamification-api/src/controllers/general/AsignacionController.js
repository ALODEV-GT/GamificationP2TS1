const conexion = require('./conexionDB')

const guardarAsignacion = async (req, res) => {
  const { id_usuario, codigo_aula, activo } = req.body;

  const nuevoAula = await conexion.pool.query(
    'INSERT INTO control_aulas.asignacion(id_usuario,codigo_aula,activo) VALUES($1, $2, $3) RETURNING *',
    [id_usuario, codigo_aula, activo]
  );
  res.json(nuevoAula.rows[0])
};

module.exports = {
  guardarAsignacion: guardarAsignacion
}
