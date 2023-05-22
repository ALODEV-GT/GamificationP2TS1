const conexion = require('./conexionDB')

const guardarComentario = async (req, res) => {
  const { id_publicacion, id_usuario, comentario } = req.body;

  const nuevoComentario = await conexion.pool.query(
    'INSERT INTO control_comunicaciones.comentario(id_publicacion, id_usuario, comentario) VALUES($1, $2, $3) RETURNING *',
    [id_publicacion, id_usuario, comentario]
  );

  if (nuevoComentario) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getComentarios = async (req, res) => {
  const { id_publicacion } = req.query
  const t1 = "control_comunicaciones.comentario";
  const t2 = "control_usuarios.usuario"
  const consulta = `SELECT ${t2}.nombre, ${t2}.apellido, ${t2}.usuario, ${t1}.comentario FROM ${t1} JOIN ${t2} ON ${t1}.id_usuario=${t2}.id_usuario WHERE ${t1}.id_publicacion=$1 ORDER BY ${t1}.id_comentario ASC`
  const response = await conexion.pool.query(consulta, [id_publicacion]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const getCantidadComentarios = async (req, res) => {
  const { id_publicacion } = req.query
  const t1 = "control_comunicaciones.comentario";
  const consulta = `SELECT COUNT(*) AS total FROM ${t1} WHERE id_publicacion=$1`
  const response = await conexion.pool.query(consulta, [id_publicacion]);
  res.json(response.rows[0])
}

module.exports = {
  guardarComentario: guardarComentario,
  getComentarios: getComentarios,
  getCantidadComentarios: getCantidadComentarios
}
