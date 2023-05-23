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




module.exports = {
  saveComido: saveComido
}
