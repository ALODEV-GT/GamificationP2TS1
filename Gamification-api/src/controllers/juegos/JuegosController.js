const conexion = require('../general/conexionDB')

const guardarInstanciaJuego = async (req, res) => {
  const { nombre, id_usuario_creador, id_tipo_juego } = req.body;

  const nuevaInstancia = await conexion.pool.query(
    'INSERT INTO control_general_juego.instancia_juego(nombre, id_usuario_creador, id_tipo_juego) VALUES($1, $2, $3) RETURNING *',
    [nombre, id_usuario_creador, id_tipo_juego]
  );
  res.json(nuevaInstancia.rows[0])
};

const getInstanciasJuego = async (req, res) => {
  const { id_usuario_creador } = req.query
  const t1 = "control_general_juego.instancia_juego";
  const t2 = "control_general_juego.tipo_juego"
  const consulta = `SELECT ${t1}.id_instancia_juego, ${t1}.id_tipo_juego, ${t1}.nombre AS nombre_instancia, ${t2}.nombre AS nombre_tipo_juego  FROM ${t1} JOIN ${t2} ON ${t1}.id_tipo_juego=${t2}.id_tipo_juego WHERE ${t1}.id_usuario_creador=$1 ORDER BY ${t1}.id_instancia_juego DESC`
  const response = await conexion.pool.query(consulta, [id_usuario_creador]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const guardarCompartirAula = async (req, res) => {
  const { id_instancia_juego, codigo_aula } = req.body;

  const nuevoCA = await conexion.pool.query(
    'INSERT INTO control_general_juego.compartir_aula(id_instancia_juego,codigo_aula) VALUES($1, $2) RETURNING *',
    [id_instancia_juego, codigo_aula]
  );

  if (nuevoCA.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const existeCompartirAula = async (req, res) => {
  const { id_instancia_juego, codigo_aula } = req.query;

  const ca = await conexion.pool.query(
    'SELECT * FROM control_general_juego.compartir_aula WHERE id_instancia_juego=$1 AND codigo_aula=$2',
    [id_instancia_juego, codigo_aula]
  );

  if (ca.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getAllCompartirAula = async (req, res) => {
  const { codigo_aula } = req.query;
  const t1 = "control_general_juego.compartir_aula";
  const t2 = "control_general_juego.instancia_juego";
  const consulta = `SELECT ${t1}.id_instancia_juego, ${t2}.nombre, ${t2}.id_tipo_juego FROM ${t1} JOIN ${t2} ON ${t1}.id_instancia_juego=${t2}.id_instancia_juego WHERE ${t1}.codigo_aula=$1 ORDER BY ${t1}.id_compartir_aula ASC`;
  const ca = await conexion.pool.query(consulta, [codigo_aula]);

  if (ca.rows) {
    res.json(ca.rows)
  } else {
    res.json([])
  }
};

module.exports = {
  guardarInstanciaJuego: guardarInstanciaJuego,
  getInstanciasJuego: getInstanciasJuego,
  guardarCompartirAula: guardarCompartirAula,
  existeCompartirAula: existeCompartirAula,
  getAllCompartirAula: getAllCompartirAula
}
