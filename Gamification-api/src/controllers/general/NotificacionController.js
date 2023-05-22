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
  const { id_usuario_noti,codigo_aula,visto } = req.body;

  const nuevaNoti = await conexion.pool.query(
    'INSERT INTO control_notificaciones.noti_rechazado_aula(id_usuario_noti,codigo_aula,visto) VALUES($1, $2, $3) RETURNING *',
    [id_usuario_noti,codigo_aula,visto]
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

module.exports = {
  guardarNotiSolicitudAula: guardarNotiSolicitudAula,
  getNotiSolicitudesAula: getNotiSolicitudesAula,
  existeNotiSolicitudAula: existeNotiSolicitudAula,
  guardarNotiAceptadoAula: guardarNotiAceptadoAula,
  getNotisAceptadoAula: getNotisAceptadoAula,
  setVistoNotiSolicitudAula: setVistoNotiSolicitudAula,
  guardarNotiRechazadoAula: guardarNotiRechazadoAula,
  getNotisRechazadoAula: getNotisRechazadoAula
}
