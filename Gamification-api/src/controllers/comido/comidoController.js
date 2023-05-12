const conexion = require('../general/conexionDB')

const saveComido = async (req, res) => {
  const { palabra } = req.body
  console.log(palabra);
  console.log(req.body);
  const resp = await saveGameConfigs(palabra)
  console.log(resp);
  //Recuperar id gameConfigs
  //saveClues(game.clues)
  res.json("Guardado en la db")
};

const saveGameConfigs = async (palabra) => {
  const consulta = 'INSERT INTO control_game_comido.game_config(palabra) VALUES($1) RETURNING *'
  const response = await conexion.pool.query(
    consulta,
    [palabra]);
  return response;
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
