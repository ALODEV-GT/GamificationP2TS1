const conexion = require('../general/conexionDB')

const saveaMemorama = async (req, res) => {
    const insertInstancia = await saveInstanciaJuego(req.body)
    const insertTema = await saveTema(req.body, insertInstancia.rows[0].id_instancia_juego)
    await saveQuestions(req.body.preguntas,insertTema.rows[0]) 
    res.json(req.body)
}

const saveInstanciaJuego = async (tema) => {
    const response = await conexion.pool.query(
        'INSERT INTO control_general_juego.instancia_juego(nombre, id_usuario_creador, id_tipo_juego) VALUES($1, $2, $3) RETURNING *',
        [tema.titulo,tema.id_user_creador, tema.id_tipo_juego]); 
    return response ;
}

const saveTema = async (tema,codigoJuego) => {
    const response = await conexion.pool.query(
        'INSERT INTO control_game_memorama.Tema(titulo, cantidad_preguntas, dificultad, id_instancia_juego) VALUES($1, $2, $3, $4) RETURNING *',
        [tema.titulo,tema.preguntas.length, tema.dificultad, codigoJuego]); 
    return response ;
};

const getTemasJuego=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT tema.* FROM control_game_memorama.Tema AS tema INNER JOIN control_general_juego.instancia_juego AS instancia ON tema.id_instancia_juego = instancia.id_instancia_juego WHERE instancia.id_usuario_creador=$1',[idUser])
    res.json(response.rows)
}

const getTemaJuegoIdInstancia=async (req, res) => {
    const idMemorama=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_memorama.Tema WHERE id_instancia_juego=$1',[idMemorama])
    res.json(response.rows[0])
}

const getTemaMemorama = async (req, res) => {
    const idMemorama=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_memorama.Tema WHERE id=$1',[idMemorama])
    res.json(response.rows[0])
}

const getQuestions=async (req, res) => {
    const idTema=req.query.id
    const response = await conexion.pool.query('SELECT pregunta.* FROM control_game_memorama.pregunta AS pregunta INNER JOIN control_game_memorama.Tema_pregunta AS asoci ON pregunta.id = asoci.id_pregunta WHERE asoci.id_tema=$1',[idTema])
    res.json(response.rows)
}

const getRespuestas=async (req, res) => {
    const idPregunta=req.query.id
    const response = await conexion.pool.query('SELECT respuesta.* FROM control_game_memorama.respuesta AS respuesta INNER JOIN control_game_memorama.pregunta_respuesta AS asoci ON respuesta.id = asoci.id_respuesta WHERE asoci.id_pregunta = $1',[idPregunta])
    res.json(response.rows)
}


/**
 * guarda las perguntas y la asociacion con el tema, invoca a la funcion de savePreguntas
 * @param {*} preguntas 
 * @param {*} tema 
 */
const saveQuestions = async (preguntas, tema) => {
    for (const pregunta of preguntas) {
        const response = await conexion.pool.query(
            'INSERT INTO control_game_memorama.pregunta(cantidad_respuestas,pregunta) VALUES($1, $2) RETURNING *',
            [pregunta.respuestas.length, pregunta.pregunta])
        await saveRespuestas(pregunta.respuestas,response.rows[0])
        await conexion.pool.query(
            'INSERT INTO control_game_memorama.Tema_pregunta(id_pregunta,id_tema) VALUES($1, $2)',
            [response.rows[0].id, tema.id])
    }
  } 

  /**
   * Funcion para guardar las respuestas asi mismo guarda la asociacion con la pregunta
   * @param {*} respuestas 
   * @param {*} pregunta 
   */
  const saveRespuestas = async (respuestas, pregunta)=> {
    for (const respuesta of respuestas) {
        const respuestaInsert = await conexion.pool.query(
            'INSERT INTO control_game_memorama.respuesta(respuesta) VALUES($1) RETURNING *',
            [respuesta.respuesta])
        await conexion.pool.query(
            'INSERT INTO control_game_memorama.pregunta_respuesta(id_pregunta, id_respuesta ) VALUES($1,$2)',
            [pregunta.id, respuestaInsert.rows[0].id])
    }
  }

  const setDificultad = async (req, res)=> {
    const tema = req.body
    const response = await conexion.pool.query(
        'UPDATE control_game_memorama.Tema SET dificultad = $1 WHERE id =$2 RETURNING *',
        [tema.dificultad, tema.id]); 
    return res.json(response.rows[0])  ;
  }

  const guardarPuntaje = async (req, res)=> {
    const puntaje = req.body
    const existente = await conexion.pool.query(
        'select * from control_game_memorama.punteo_partida_memorama where id_instancia_juego = $1 and codigo_aula = $2 and id_usuario_juegador=$3',
        [puntaje.id_instancia_juego,puntaje.codigo_aula, puntaje.id_usuario_juegador])
    if (existente.rows.length>0) {
        const responseUpdate = await conexion.pool.query(
            'UPDATE control_game_memorama.punteo_partida_memorama SET dificultad = $1, punteo = $2 WHERE id = $3',
            [puntaje.dificultad,puntaje.punteo,existente.rows[0].id ])
        return res.json(responseUpdate.rows[0]) ;
    }
    const response = await conexion.pool.query(
    'INSERT INTO control_game_memorama.punteo_partida_memorama(id_instancia_juego, codigo_aula, id_usuario_juegador, punteo, dificultad) VALUES($1,$2,$3,$4,$5)',
    [puntaje.id_instancia_juego,puntaje.codigo_aula, puntaje.id_usuario_juegador, puntaje.punteo, puntaje.dificultad])
    return res.json(response.rows[0]) ;
  }

  getCodigoAulaPuntacionesDePartida = async (req, res)=> {
    const idInstanciaJuego=req.query.id
    const response = await conexion.pool.query('SELECT codigo_aula, COUNT(*) AS cantidad_registros FROM control_game_memorama.punteo_partida_memorama WHERE id_instancia_juego = $1 GROUP BY codigo_aula',[idInstanciaJuego])
    res.json(response.rows) 
  }

  getListPuntajesAulaInstaicaJuego = async (req, res)=> {
    const idInstanciaJuego=req.query.id
    const codigo=req.query.codigo
    const response = await conexion.pool.query('SELECT usr.nombre, usr.apellido, usr.usuario, partida.punteo, partida.dificultad FROM control_usuarios.usuario AS usr INNER JOIN control_game_memorama.punteo_partida_memorama AS partida ON usr.id_usuario = partida.id_usuario_juegador  WHERE partida.codigo_aula = $1 AND partida.id_instancia_juego = $2 ORDER BY partida.punteo DESC',[codigo, idInstanciaJuego])
    res.json(response.rows) 
  }
  


module.exports={
    saveaMemorama:saveaMemorama,
    getTemasJuego:getTemasJuego,
    getQuestions:getQuestions,
    getRespuestas:getRespuestas,
    setDificultad:setDificultad,
    getTemaMemorama:getTemaMemorama,
    guardarPuntaje:guardarPuntaje,
    getTemaJuegoIdInstancia:getTemaJuegoIdInstancia,
    getCodigoAulaPuntacionesDePartida:getCodigoAulaPuntacionesDePartida,
    getListPuntajesAulaInstaicaJuego:getListPuntajesAulaInstaicaJuego
}