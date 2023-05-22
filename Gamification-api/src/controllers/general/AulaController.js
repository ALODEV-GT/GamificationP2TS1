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

const existeAula = async (req, res) => {
  const { codigo_aula } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_aulas.aula WHERE codigo_aula=$1', [codigo_aula]);

  if (response.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
}

const getAulaByCodigo = async (req, res) => {
  const { codigo_aula } = req.query;
  const response = await conexion.pool.query('SELECT * FROM control_aulas.aula WHERE codigo_aula=$1', [codigo_aula]);
  res.json(response.rows[0])
}

const getMisAulasProfesor = async (req, res) => {
  const { id_usuario } = req.query
  const response = await conexion.pool.query('SELECT * FROM control_aulas.aula WHERE id_usuario_creador=$1', [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const getMisAulasEstudiante = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_aulas.asignacion";
  const t2 = "control_aulas.aula";
  const consulta = `SELECT ${t2}.codigo_aula,${t2}.id_usuario_creador,${t2}.nombre,${t2}.archivado FROM ${t1} JOIN ${t2} ON ${t1}.codigo_aula=${t2}.codigo_aula WHERE ${t1}.id_usuario=$1`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

module.exports = {
  guardarAula: guardarAula,
  existeAula: existeAula,
  getMisAulasProfesor: getMisAulasProfesor,
  getMisAulasEstudiante: getMisAulasEstudiante,
  getAulaByCodigo: getAulaByCodigo

}
