const conexion = require('../general/conexionDB')



const saveCurioso = async (req, res) => {
    const saveInstancia = await saveInstanciaJuego(req.body);
    const insertTema = await saveTitulo(saveInstancia.rows[0].id_instancia_juego,req.body);


    const inserPregunta = await savePregunta(insertTema.rows[0].id,req.body.preguntas,req.body)


   
    res.json(req.body) 
}


const saveInstanciaJuego = async (titulo)=>{
    const response = await conexion.pool.query(
    'INSERT INTO control_general_juego.instancia_juego(nombre, id_usuario_creador, id_tipo_juego) VALUES($1, $2, $3) RETURNING *',
    [titulo.titulo,titulo.id_user_creador,titulo.id_tipo_juego]);
    return response;
}



const saveTitulo = async (id_instancia,tema) => {
    const response = await conexion.pool.query(
        'INSERT INTO control_game_preguntados.Titulo(id_instancia_juego,titulo, id_user_creador) VALUES($1, $2, $3) RETURNING *',
        [id_instancia,tema.titulo,tema.id_user_creador]); 
    return response ;
};


const savePregunta = async (id_titulo,preguntas,tema) => {
    for (const pregunta of preguntas) {
        
        const response = await conexion.pool.query(
            'INSERT INTO control_game_preguntados.Pregunta(id_titulo,pregunta,respuesta) VALUES($1, $2, $3) RETURNING *',
            [id_titulo,pregunta.pregunta,pregunta.respuesta])

            await saveOpciones(pregunta.opciones,response.rows[0].id) 
     
        }
    


  } 


  const saveOpciones = async (opciones, id_pregunta) => {
    for (const opcion of opciones) {
        const response = await conexion.pool.query(
            'INSERT INTO control_game_preguntados.Opciones(id_pregunta,opcion) VALUES($1, $2) RETURNING *',
            [id_pregunta,opcion])
      }
  } 






  const getTitulosJuegoInstancia=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_preguntados.Titulo WHERE id_instancia_juego=$1',[idUser])
    res.json(response.rows[0])
}

const getPreguntaJuegoInstancia=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_preguntados.Pregunta WHERE id_titulo=$1',[idUser])
    res.json(response.rows)
}


const getOpcionesJuegoInstancia=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_preguntados.Opciones WHERE id_pregunta=$1',[idUser])
    res.json(response.rows)
}

const guardarHistorial = async(req,res)=>{
    const puntaje = req.body
    const response = await conexion.pool.query(
    'INSERT INTO control_game_preguntados.historial_partida_curioso(id_instancia_juego, codigo_aula, id_jugador, puntuacion, total_aciertos) VALUES($1,$2,$3,$4,$5)',
    [puntaje.id_instancia_juego,puntaje.codigo_aula, puntaje.id_jugador, puntaje.puntuacion, puntaje.total_aciertos])
    return res.json(response.rows[0])  ;

}

const listarHistorial = async(req,res)=>{

    const puntaje = req.body
    const response = await conexion.pool.query(
    'SELECT nombre,usuario,codigo_aula,puntuacion,total_aciertos FROM control_usuarios.usuario AS users INNER JOIN control_game_preguntados.historial_partida_curioso AS histori ON users.id_usuario=histori.id_jugador ORDER BY codigo_aula;')
    return res.json(response.rows)  ;



}

const listarHistorialAula = async(req,res)=>{
    const idUser=req.query.id
    const instancia=req.query.instancia
    const puntaje = req.body
    const response = await conexion.pool.query(
    'SELECT nombre,usuario,codigo_aula,puntuacion,total_aciertos FROM control_usuarios.usuario AS users INNER JOIN control_game_preguntados.historial_partida_curioso AS histori ON users.id_usuario=histori.id_jugador WHERE codigo_aula=$1 AND id_instancia_juego=$2',[idUser,instancia])
    return res.json(response.rows)  ;



}








  module.exports={
    saveCurioso:saveCurioso,
    getTitulosJuegoInstancia:getTitulosJuegoInstancia,
    getPreguntaJuegoInstancia:getPreguntaJuegoInstancia,
    getOpcionesJuegoInstancia:getOpcionesJuegoInstancia,
    guardarHistorial:guardarHistorial,
    listarHistorial:listarHistorial,
    listarHistorialAula:listarHistorialAula,
 /*    getTemasJuego:getTemasJuego,
    getQuestions:getQuestions,
    getRespuestas:getRespuestas */
}

