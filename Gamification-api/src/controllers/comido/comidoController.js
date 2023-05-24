const conexion = require('../general/conexionDB')

const saveComido = async (req, res) => {
  const { id_instancia_juego, palabra, pistas } = req.body
  const resp = await saveGameConfigs(id_instancia_juego, palabra)
  const id_gc = resp.id_gc
  saveClues(id_gc, pistas)
  res.json(true)
};

const saveGameConfigs = async (idInstanciaJuego, palabra) => {
  const consulta = 'INSERT INTO control_game_comido.game_config(id_instancia_juego,palabra) VALUES($1,$2) RETURNING *'
  const response = await conexion.pool.query(
    consulta,
    [idInstanciaJuego, palabra]);
  return response.rows[0];
}

const saveClues = async (idGameConfigs, clues) => {
  clues.forEach(clue => {
    saveClue(idGameConfigs, clue);
  });
}

const saveClue = async (idGameConfigs, clue) => {
  const consulta = 'INSERT INTO control_game_comido.pista(id_gc, texto) VALUES($1, $2) RETURNING *'
  const response = await conexion.pool.query(
    consulta,
    [idGameConfigs, clue]);
  return response;
}

const getCofigsGame = async (req, res) => {
  const { id_instancia_juego } = req.query
  const consulta1 = `SELECT * FROM control_game_comido.game_config WHERE id_instancia_juego=$1`;
  const gameConfig = await conexion.pool.query(consulta1, [id_instancia_juego]);
  const idGc = gameConfig.rows[0].id_gc;
  const palabra = gameConfig.rows[0].palabra;

  const consulta2 = `SELECT texto FROM control_game_comido.pista WHERE id_gc=$1 ORDER BY id_pista ASC`
  const response = await conexion.pool.query(consulta2, [idGc]);
  const pistas = convertirPistasAArrayString(response.rows);

  let objeto = {}
  objeto.id_gc = idGc;
  objeto.id_instancia_juego = id_instancia_juego;
  objeto.palabra = palabra;
  objeto.pistas = pistas;
  res.json(objeto)
}

function convertirPistasAArrayString(pistas) {
  const pistasA = []
  pistas.forEach(element => {
    pistasA.push(element.texto)
  });
  return pistasA;
}

const guardarPunteo = async (req, res) => {
  const { id_instancia_juego, codigo_aula, id_usuario, puteo, numero_errores, puntos_perdidos } = req.body
  const consulta = 'INSERT INTO control_game_comido.puntuacion(id_instancia_juego,codigo_aula,id_usuario,puteo,numero_errores,puntos_perdidos) VALUES($1,$2,$3,$4,$5,$6) RETURNING *'
  const response = await conexion.pool.query(
    consulta,
    [id_instancia_juego, codigo_aula, id_usuario, puteo, numero_errores, puntos_perdidos]);
  if (response.rows[0]) {
    res.json(true)
  } else {
    res.json(false)
  }
};

const getPuntuaciones = async (req, res) => {
  const { id_instancia_juego } = req.query
  const consulta1 = `SELECT * FROM control_general_juego.compartir_aula WHERE id_instancia_juego=$1`;
  const espacios = await conexion.pool.query(consulta1, [id_instancia_juego]);
  listadoAulas = espacios.rows;
  const grupos = await recuperarPuntuacionesAulas(id_instancia_juego, espacios.rows)
  res.json(grupos)
}

async function recuperarPuntuacionesAulas(id_instancia_juego, aulas) {
  const grupos = []

  for (let i = 0; i < aulas.length; i++) {
    const registros = await recuperarPuntuacionAula(id_instancia_juego, aulas[i].codigo_aula)
    let grupo = {}
    grupo.codigo = aulas[i].codigo_aula;
    grupo.registros = registros;
    grupos.push(grupo);
  }
  return grupos;
}

async function recuperarPuntuacionAula(id_instancia_juego, codigo_aula) {
  const t1 = "control_game_comido.puntuacion";
  const t2 = "control_usuarios.usuario";
  const t3 = "control_general_juego.instancia_juego";
  const consulta2 = `SELECT ${t1}.id_instancia_juego, ${t2}.nombre AS nombre_usuario, ${t2}.apellido, ${t2}.usuario, ${t3}.nombre AS nombre_partida, ${t1}.numero_errores, ${t1}.puntos_perdidos, ${t1}.puteo FROM ${t1} JOIN ${t2} ON ${t1}.id_usuario=${t2}.id_usuario JOIN ${t3} ON ${t1}.id_instancia_juego=${t3}.id_instancia_juego WHERE ${t1}.id_instancia_juego=$1 AND ${t1}.codigo_aula=$2 ORDER BY ${t1}.puteo DESC`;
  const punteosAula = await conexion.pool.query(consulta2, [id_instancia_juego, codigo_aula]);
  return punteosAula.rows;
}

module.exports = {
  saveComido: saveComido,
  getCofigsGame: getCofigsGame,
  guardarPunteo: guardarPunteo,
  getPuntuaciones: getPuntuaciones
}
