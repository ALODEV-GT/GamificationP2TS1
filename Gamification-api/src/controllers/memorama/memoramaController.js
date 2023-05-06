const conexion = require('../general/conexionDB')

const saveaMemorama = async (req, res) => {
    const insertTema = await saveTema(req.body)
    await saveQuestions(req.body.preguntas,insertTema.rows[0]) 
    res.json(req.body)
}

const saveTema = async (tema) => {
    const response = await conexion.pool.query(
        'INSERT INTO control_game_memorama.Tema(titulo, id_user_creador, cantidad_preguntas) VALUES($1, $2, $3) RETURNING *',
        [tema.titulo,tema.id_user_creador,tema.preguntas.length]); 
    return response ;
};

const getTemasJuego=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_memorama.Tema WHERE id_user_creador=$1',[idUser])
    res.json(response.rows)
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
  


module.exports={
    saveaMemorama:saveaMemorama,
    getTemasJuego:getTemasJuego,
    getQuestions:getQuestions,
    getRespuestas:getRespuestas
}