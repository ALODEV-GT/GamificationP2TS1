const conexion = require('./conexionDB')

const guardarPublicacion = async (req, res) => {
  const { id_usuario, codigo_aula, contenido_publicacion } = req.body;

  const id_contenido_publicacion = await guardarContenidoPublicacion(contenido_publicacion)

  const nuevaPublicacion = await conexion.pool.query(
    'INSERT INTO control_comunicaciones.publicacion(id_usuario, codigo_aula, id_contenido_publicacion) VALUES($1, $2, $3) RETURNING *',
    [id_usuario, codigo_aula, id_contenido_publicacion]
  );

  if (nuevaPublicacion) {
    res.json(true)
  } else {
    res.json(false)
  }
};

async function guardarContenidoPublicacion(contenido) {
  const respuesta = await conexion.pool.query(
    'INSERT INTO control_comunicaciones.contenido_publicacion(contenido) VALUES($1) RETURNING *',
    [contenido]
  );
  return respuesta.rows[0].id_contenido_publicacion;
}

const getPublicaciones = async (req, res) => {
  const { codigo_aula } = req.query
  const t1 = "control_comunicaciones.publicacion";
  const t2 = "control_comunicaciones.contenido_publicacion";
  const consulta = `SELECT ${t1}.id_publicacion, ${t1}.id_usuario, ${t2}.contenido AS contenido_publicacion FROM ${t1} JOIN  ${t2} ON ${t1}.id_contenido_publicacion=${t2}.id_contenido_publicacion WHERE ${t1}.codigo_aula=$1 ORDER BY ${t1}.id_publicacion DESC`
  const response = await conexion.pool.query(consulta, [codigo_aula]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

module.exports = {
  guardarPublicacion: guardarPublicacion,
  getPublicaciones: getPublicaciones
}
