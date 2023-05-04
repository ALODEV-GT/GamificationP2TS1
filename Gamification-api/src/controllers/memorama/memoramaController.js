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
    saveaMemorama:saveaMemorama
}