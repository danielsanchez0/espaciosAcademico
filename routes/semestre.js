var express = require('express');
var router = express.Router();

const { Op } = require("sequelize");

const modelo = require("../models/index")
const Semestre = modelo.Semestre

/**
 * @swagger
 * /semestre/createsemestre:
 *   post:
 *     description: Crea un nuevo periodo semestral.
 *     tags:
 *     - semestre
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Semestre creado correctamente.
 *         type: json
 *       401:
 *         description: Error de acceso, debe estar logueado para poder acceder a esta información.
 *         type: json
 *       422:
 *         description: El semestre no se ha creado, se debe llenar todos los campos.
 *         type: json
 */
router.post('/createsemestre', (req, res) => {
	const { nombre, fechaInicio, fechaFinal } = req.body;

	if (!nombre || !fechaInicio || !fechaFinal) {
		return res.status(422).json({ error: "por favor, llena todos los campos" })
	}

	Semestre.findOne({
		where: {
			[Op.or]: [
				{ nombre: nombre },
				{ fechaInicio: { [Op.between]: [fechaInicio, fechaFinal] } },
				{ fechaFinal: { [Op.between]: [fechaInicio, fechaFinal] } }
			]
		}
	}).then(data => {
		if (data) {
			return res.status(422).json({ error: "ya existe un semestre con estas caracteristicas" })
		}

		const semestre = new Semestre({
			nombre,
			fechaInicio,
			fechaFinal
		})

		semestre.save().then(result => {
			res.status(201).json({ semestre: result })
		}).catch(err => {
			console.log(err)
		})
	}).catch(err => {
		console.log(err)
	})
})

router.get('/getsemestres',(req,res)=>{
    Semestre.findAll({
        order: [['nombre','DESC']]
    }).then(semestres =>{
        res.status(201).json({semestres:semestres})

    }).catch(err =>{
        console.log(err)
    })
})

module.exports = router;