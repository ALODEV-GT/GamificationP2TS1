const conexion = require('./conexionDB')

const guardarLike = async (req, res) => {
  const { id_publicacion, id_usuario } = req.body;

  const nuevoLike = await conexion.pool.query(
    'INSERT INTO control_comunicaciones.like(id_publicacion, id_usuario) VALUES($1, $2) RETURNING *',
    [id_publicacion, id_usuario]
  );

  res.json(nuevoLike.rows[0])
};

const getCantidadLikes = async (req, res) => {
  const { id_publicacion } = req.query
  const t1 = "control_comunicaciones.like";
  const consulta = `SELECT COUNT(*) AS total FROM ${t1} WHERE id_publicacion=$1`
  const response = await conexion.pool.query(consulta, [id_publicacion]);
  res.json(response.rows[0])
}

const dislike = async (req, res) => {
  const { id_publicacion, id_usuario } = req.query
  const t1 = "control_comunicaciones.like";
  const consulta = `SELECT * FROM ${t1} WHERE id_publicacion=$1 AND id_usuario=$2`
  const response = await conexion.pool.query(consulta, [id_publicacion, id_usuario]);
  if (response.rows[0]) {
    const consultaD = `DELETE FROM ${t1} WHERE id_like=$1`
    const eliminar = await conexion.pool.query(consultaD, [response.rows[0].id_like]);
    res.json(true)
  } else {
    res.json(false)
  }
}

module.exports = {
  guardarLike: guardarLike,
  getCantidadLikes: getCantidadLikes,
  dislike: dislike,
}
