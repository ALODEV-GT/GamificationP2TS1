const conexion = require('./conexionDB')

const guardarNotiSolicitudAula = async (req, res) => {
  const { id_usuario_noti, id_usuario_solicitante, codigo_aula, visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_solicitud_aula(id_usuario_noti, id_usuario_solicitante, codigo_aula, visto) VALUES($1, $2, $3, $4) RETURNING *',
    [id_usuario_noti, id_usuario_solicitante, codigo_aula, visto]
  );

  if (nuevaNoti) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getNotiSolicitudesAula = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_notificaciones.noti_solicitud_aula"
  const t2 = "control_usuarios.usuario"
  const t3 = "control_aulas.aula"
  const consulta = `SELECT ${t1}.id_noti_solicitud_aula, ${t1}.codigo_aula, ${t2}.id_usuario AS id_usuario_solicitante, ${t2}.nombre, ${t2}.apellido, ${t2}.usuario, ${t3}.nombre AS nombre_aula FROM ${t1} JOIN ${t2} ON ${t1}.id_usuario_solicitante=${t2}.id_usuario JOIN ${t3} ON ${t1}.codigo_aula=${t3}.codigo_aula  WHERE ${t1}.id_usuario_noti=$1 AND ${t1}.visto=false ORDER BY ${t1}.id_noti_solicitud_aula DESC`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const existeNotiSolicitudAula = async (req, res) => {
  const { id_usuario, codigo_aula } = req.query
  const t1 = "control_notificaciones.noti_solicitud_aula"
  const consulta = `SELECT * FROM ${t1} WHERE id_usuario_solicitante=$1 AND codigo_aula=$2`
  const response = await conexion.pool.query(consulta, [id_usuario, codigo_aula]);
  if (response.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
}

const setVistoNotiSolicitudAula = async (req, res) => {
  const { id_noti } = req.body
  const consulta = `UPDATE control_notificaciones.noti_solicitud_aula SET visto=true WHERE id_noti_solicitud_aula=$1 RETURNING *`
  const response = await conexion.pool.query(consulta, [id_noti]);
  if (response.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
}

const guardarNotiAceptadoAula = async (req, res) => {
  const { id_usuario_noti, id_asignacion, visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_aceptado_aula(id_usuario_noti, id_asignacion, visto) VALUES($1, $2, $3) RETURNING *',
    [id_usuario_noti, id_asignacion, visto]
  );

  if (nuevaNoti.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getNotisAceptadoAula = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_notificaciones.noti_aceptado_aula"
  const t2 = "control_aulas.asignacion"
  const t3 = "control_aulas.aula"
  const consulta = `SELECT ${t1}.id_noti_aceptado_aula, ${t3}.nombre AS nombre_aula, ${t3}.codigo_aula FROM ${t1} JOIN ${t2} ON ${t1}.id_asignacion=${t2}.id_asignacion JOIN ${t3} ON ${t2}.codigo_aula=${t3}.codigo_aula  WHERE ${t1}.id_usuario_noti=$1 AND ${t1}.visto=false ORDER BY ${t1}.id_noti_aceptado_aula DESC`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const guardarNotiRechazadoAula = async (req, res) => {
  const { id_usuario_noti, codigo_aula, visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_rechazado_aula(id_usuario_noti,codigo_aula,visto) VALUES($1, $2, $3) RETURNING *',
    [id_usuario_noti, codigo_aula, visto]
  );

  if (nuevaNoti.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getNotisRechazadoAula = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_notificaciones.noti_rechazado_aula"
  const t2 = "control_aulas.aula"
  const consulta = `SELECT ${t1}.id_noti_rechazado_aula, ${t2}.nombre AS nombre_aula, ${t2}.codigo_aula FROM ${t1} JOIN ${t2} ON ${t1}.codigo_aula=${t2}.codigo_aula WHERE ${t1}.id_usuario_noti=$1 AND ${t1}.visto=false ORDER BY ${t1}.id_noti_rechazado_aula DESC`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const guardarNotiComentario = async (req, res) => {
  const { id_usuario_noti, id_comentario, visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_comentario(id_usuario_noti, id_comentario, visto) VALUES($1, $2, $3) RETURNING *',
    [id_usuario_noti, id_comentario, visto]
  );

  if (nuevaNoti.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getNotisComentarios = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_notificaciones.noti_comentario"
  const t2 = "control_usuarios.usuario"
  const t3 = "control_comunicaciones.comentario"
  const t4 = "control_comunicaciones.contenido_publicacion"
  const t5 = "control_comunicaciones.publicacion"
  const consulta = `SELECT ${t2}.nombre, ${t2}.apellido, ${t2}.usuario, ${t4}.contenido FROM ${t1} JOIN ${t3} ON ${t1}.id_comentario=${t3}.id_comentario JOIN ${t2} ON ${t3}.id_usuario=${t2}.id_usuario JOIN ${t5} ON ${t3}.id_publicacion=${t5}.id_publicacion JOIN ${t4} ON ${t5}.id_contenido_publicacion=${t4}.id_contenido_publicacion WHERE ${t1}.id_usuario_noti=$1 AND ${t1}.visto=false ORDER BY ${t1}.id_noti_comentario DESC`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const guardarNotiLike = async (req, res) => {
  const { id_usuario_noti, id_like, visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_like(id_usuario_noti,id_like,visto) VALUES($1, $2, $3) RETURNING *',
    [id_usuario_noti, id_like, visto]
  );

  if (nuevaNoti.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getNotisLikes = async (req, res) => {
  const { id_usuario } = req.query
  const t1 = "control_notificaciones.noti_like"
  const t2 = "control_usuarios.usuario"
  const t3 = "control_comunicaciones.like"
  const t4 = "control_comunicaciones.contenido_publicacion"
  const t5 = "control_comunicaciones.publicacion"
  const consulta = `SELECT ${t2}.nombre, ${t2}.apellido, ${t2}.usuario, ${t4}.contenido FROM ${t1} JOIN ${t3} ON ${t1}.id_like=${t3}.id_like JOIN ${t2} ON ${t3}.id_usuario=${t2}.id_usuario JOIN ${t5} ON ${t3}.id_publicacion=${t5}.id_publicacion JOIN ${t4} ON ${t5}.id_contenido_publicacion=${t4}.id_contenido_publicacion WHERE ${t1}.id_usuario_noti=$1 AND ${t1}.visto=false ORDER BY ${t1}.id_noti_like DESC`
  const response = await conexion.pool.query(consulta, [id_usuario]);
  if (response.rows) {
    res.json(response.rows)
  } else {
    res.json([])
  }
}

const quitarNotiLike = async (req, res) => {
  const { id_publicacion, id_usuario } = req.query;
  const busqueda = `SELECT * FROM control_comunicaciones.like WHERE id_publicacion=$1 AND id_usuario=$2`
  const busRes = await conexion.pool.query(busqueda, [id_publicacion, id_usuario])
  if (busRes.rows[0]) {
    const consulta = `DELETE FROM control_notificaciones.noti_like WHERE id_like=$1`
    const eliminar = await conexion.pool.query(consulta, [busRes.rows[0].id_like]);
    res.json(true)
  } else {
    res.json(false)
  }
};

module.exports = {
  guardarNotiSolicitudAula: guardarNotiSolicitudAula,
  getNotiSolicitudesAula: getNotiSolicitudesAula,
  existeNotiSolicitudAula: existeNotiSolicitudAula,
  guardarNotiAceptadoAula: guardarNotiAceptadoAula,
  getNotisAceptadoAula: getNotisAceptadoAula,
  setVistoNotiSolicitudAula: setVistoNotiSolicitudAula,
  guardarNotiRechazadoAula: guardarNotiRechazadoAula,
  getNotisRechazadoAula: getNotisRechazadoAula,
  guardarNotiComentario: guardarNotiComentario,
  getNotisComentarios: getNotisComentarios,
  guardarNotiLike: guardarNotiLike,
  getNotisLikes: getNotisLikes,
  quitarNotiLike: quitarNotiLike
}
