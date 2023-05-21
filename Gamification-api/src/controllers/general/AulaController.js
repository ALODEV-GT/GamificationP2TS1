const conexion = require('./conexionDB')

const guardarAula = async (req, res) => {
  const { codigo_aula, id_usuario_creador, nombre, archivado } = req.body;
  const nuevoAula = await conexion.pool.query(
    'INSERT INTO control_aulas.aula(codigo_aula, id_usuario_creador, nombre, archivado) VALUES($1, $2, $3, $4) RETURNING *',
    [codigo_aula, id_usuario_creador, nombre, archivado]
  );
  if (nuevoAula) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const validarCodigo = async (req, res) => {
  const { codigo_aula } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_aulas.aula WHERE codigo_aula=$1', [codigo_aula]);

  //Validacion si ya esta en uso el codigo
  if (response.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
}

const getMisAulas = async (req, res) => {
  const { id_usuario } = req.query
  const response = await conexion.pool.query('SELECT * FROM control_aulas.aula WHERE id_usuario_creador=$1', [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

module.exports = {
  guardarAula: guardarAula,
  validarCodigo: validarCodigo,
  getMisAulas: getMisAulas

}
