const conexion = require('../general/conexionDB')

const saveaMemorama = async (req, res) => {
    //const id_creador=req.query.id
    console.log(req.body.preguntas[0])
    res.json(req.body)
}


module.exports={
    saveaMemorama:saveaMemorama
}