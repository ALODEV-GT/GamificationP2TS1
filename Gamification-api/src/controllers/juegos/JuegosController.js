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

module.exports = {
  guardarInstanciaJuego: guardarInstanciaJuego,
  getInstanciasJuego: getInstanciasJuego
}
