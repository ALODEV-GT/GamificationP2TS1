const conexion = require('../general/conexionDB')

const saveaSopa = async (req, res) => {
    const saveInstancia = await saveInstanciaJuego(req.body);
    const insertTema = await saveTitulo(saveInstancia.rows[0].id_instancia_juego,req.body);
    await savePalabras(req.body.palabras,insertTema.rows[0]) 
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
        'INSERT INTO control_game_sopa.Titulo(id_instancia_juego,titulo, id_user_creador, nivel) VALUES($1, $2, $3, $4) RETURNING *',
        [id_instancia,tema.titulo,tema.id_user_creador,tema.nivelSopa]); 
    return response ;
};


const savePalabras = async (preguntas, tema) => {
    for (const pregunta of preguntas) {
        const response = await conexion.pool.query(
            'INSERT INTO control_game_sopa.Titulo_palabra(palabra,id_titulo) VALUES($1, $2) RETURNING *',
            [pregunta,tema.id])
      }
  } 


  const getTemasJuego=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_sopa.Titulo WHERE id_user_creador=$1',[idUser])
    res.json(response.rows)
}

const getPalabras=async (req, res) => {
    const idTema=req.query.id
    const response = await conexion.pool.query('SELECT palabra FROM control_game_sopa.Titulo_palabra WHERE id_titulo=$1',[idTema])
    res.json(response.rows)
}

//usdando 
const getTemasJuegoInstancia=async (req, res) => {
    const idUser=req.query.id
    const response = await conexion.pool.query('SELECT * FROM control_game_sopa.Titulo WHERE id_instancia_juego=$1',[idUser])
    res.json(response.rows[0])
}





const guardarHisotiral = async(req,res)=>{
    const puntaje = req.body
    const response = await conexion.pool.query(
    'INSERT INTO control_game_sopa.historial_partida_sopa(id_instancia_juego, codigo_aula, id_jugador, puntuacion, nivel) VALUES($1,$2,$3,$4,$5)',
    [puntaje.id_instancia_juego,puntaje.codigo_aula, puntaje.id_jugador, puntaje.puntuacion, puntaje.nivel])
    return res.json(response.rows[0])  ;

}



const listarHistorial = async(req,res)=>{

    const puntaje = req.body
    const response = await conexion.pool.query(
    'SELECT nombre,usuario,codigo_aula,puntuacion,nivel FROM control_usuarios.usuario AS users INNER JOIN control_game_sopa.historial_partida_sopa AS histori ON users.id_usuario=histori.id_jugador ORDER BY codigo_aula;')
    return res.json(response.rows)  ;



}

const listarHistorialAula = async(req,res)=>{
    const idUser=req.query.id
    const instancia=req.query.instancia
    

    const puntaje = req.body
    const response = await conexion.pool.query(
    'SELECT nombre,usuario,codigo_aula,puntuacion,nivel FROM control_usuarios.usuario AS users INNER JOIN control_game_sopa.historial_partida_sopa AS histori ON users.id_usuario=histori.id_jugador WHERE codigo_aula=$1 AND id_instancia_juego=$2',[idUser,instancia])
    return res.json(response.rows)  ;



}

  



  module.exports={
    saveaSopa:saveaSopa,
    getPalabras:getPalabras,
    getTemasJuego:getTemasJuego,
    getTemasJuegoInstancia:getTemasJuegoInstancia,
    guardarHisotiral:guardarHisotiral,
    listarHistorial:listarHistorial,
    listarHistorialAula:listarHistorialAula,
 /*    getTemasJuego:getTemasJuego,
    getQuestions:getQuestions,
    getRespuestas:getRespuestas */
}