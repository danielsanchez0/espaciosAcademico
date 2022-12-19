var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Espacio = modelo.Espacio

const {Op} = require("sequelize")

router.get('/getespacio/:idespacio',(req,res)=>{
	Espacio.findOne({
		where: {
			id: req.params.idespacio
		}
	}).then(espacio=>{
		res.status(201).json({ espacio })
	}).catch(err => {
		console.log(err)
	})
})

router.post('/editarespacio/:espacioid',(req,res)=>{

	const {nombre, descripcion, capacidad} = req.body;

	if (!nombre || !descripcion || !capacidad) {
		return res.status(422).json({ error: "por favor, llena los campos" })
	}

	Espacio.update(
	{
		nombre:nombre,
		descripcion: descripcion,
		capacidad: capacidad
	},
	{
		where: {
            id: req.params.espacioid,
        }
    }).then(espacios => {
    	console.log(espacios)
		res.status(201).json({ espacios })
	}).catch(err => {
		console.log(err)
	})
})

/**
 * @swagger
 * /espacio/createespacio:
 *   post:
 *     description: Crea un nuevo espacio.
 *     tags:
 *     - espacio
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Espacio creado correctamente.
 *         type: json
 *       401:
 *         description: Error de acceso, debe estar logueado para poder acceder a esta información.
 *         type: json
 *       422:
 *         description: El espacio no se ha creado, se debe llenar todos los campos.
 *         type: json
 */
router.post('/createespacio', (req, res) => {
	const { nombre, descripcion, capacidad, sede, tipo_espacio } = req.body;

	if (!nombre || !descripcion || !capacidad || !sede || !tipo_espacio) {
		return res.status(422).json({ error: "por favor, llena los campos" })
	}

	const espacio = new Espacio({
		nombre,
		descripcion,
		capacidad,
		sede,
		tipo_espacio
	})

	espacio.save().then(result => {
		res.status(201).json({ espacio: result })
	}).catch(err => {
		console.log(err);
	})
})

router.get("/getespaciostipo", (req, res) => {

	const { tipo_espacio_id } = req.body

	Espacio.findAll({
		attributes: ["id", "nombre", "capacidad"],
		where: {
			estado: true
		},
		include: [{
			model: modelo.espacio_tipo,
			where: {
				id: tipo_espacio_id,
			},
			attributes: []
		}]
	}).then(espacios => {
		res.status(201).json({ espacios: espacios })
	}).catch(err => {
		console.log(err)
	})
})

router.delete('/deleteespacio/:espacioid',(req,res)=>{
	Espacio.update(
	{
		estado: false
	},
	{
		where: {
            id: req.params.espacioid,
        }
    }).then(espacios => {
    	console.log(espacios)
		res.status(201).json({ espacios: espacios })
	}).catch(err => {
		console.log(err)
	})
})

router.get("/getespaciosfilter", (req, res) => {

	const filters = req.query;

	Espacio.findAll({
		attributes: ["id", "nombre", "capacidad","tipo_espacio"],
		include: [
			{
				model: modelo.espacio_tipo,
				attributes: ["nombre"]
			},
			{
				model: modelo.Sede,
				attributes: ["bloque"]
			}
		]
	}).then(espacios => {
		const filteredEspacios = espacios.filter(espacio => {
			let isValid = true;
			for (key in filters) {
				isValid = isValid && espacio[key] == filters[key]
			}
			return isValid;
		});
		
		res.status(201).json({ filteredEspacios })
	}).catch(err => {
		console.log(err)
	})
})

/**
 * @swagger
 * /espacio/gethorarios:
 *   post:
 *     description: Retorna todos los horarios registrados en el sistema durante un periodo de tiempo y un espacio.
 *     tags:
 *     - espacio
 *     - horario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Horario retornado correctamente.
 *         type: json
 */
router.get('/gethorarios', (req, res) => {
	const { semestre, sala_id, year, month } = req.body;

	Espacio.findAll({
		where: {
			id: sala_id
		},
		attributes: ["id", "nombre", "capacidad"],
		include: [{
			model: modelo.Horario,
			attributes: ["dia", "hora_inicio", "hora_final"],
			required: true,
			include: [{
				model: modelo.Grupo,
				through: { attributes: [] },
				attributes: ["grupo"],
				required: true,
				include: [
					{
						model: modelo.Materia,
						attributes: ["codigo", "nombre"],
					},
					{
						model: modelo.Semestre,
						where: {
							nombre: semestre
						},
						through: { attributes: [] },
						attributes: [],

					}
				]
			}]
		}]
	}).then(horarios => {
		modelo.Semestre.findOne({
			where: {
				"nombre": semestre
			}
		}).then(semestre => {
			const fechaInicio = new Date(semestre.dataValues["fechaInicio"])
			const fechaFinal = new Date(semestre.dataValues["fechaFinal"])

			var diasSemana = [
				'domingo',
				'lunes',
				'martes',
				'miércoles',
				'jueves',
				'viernes',
				'sábado'
			];

			for (i in horarios) {
				for (j in horarios[i].dataValues["Horarios"]) {
					console.log(horarios[i].dataValues["Horarios"][j].dataValues["dia"])

					var horarios_fecha = []
					var fecha = null

					const FI = fechaInicio.getMonth() + 1
					const FF = fechaFinal.getMonth() + 1
					const year = fechaInicio.getFullYear()

					const DI = fechaInicio.getDate() + 1
					const DF = fechaFinal.getDate() + 1

					const MI = fechaInicio.getMonth() + 1
					const MF = fechaFinal.getMonth() + 1

					for (var month = FI; month <= FF; month++) {
						var diasMes = new Date(year, month, 0).getDate();

						for (var dia = 1; dia <= diasMes; dia++) {
							var indice = new Date(year, month - 1, dia).getDay();

							if (horarios[i].dataValues["Horarios"][j].dataValues["dia"] == diasSemana[indice]) {
								fecha = year + "/" + month + "/" + dia

								if ((month == MI && dia < DI) || (month == MF && dia > DF)) {
									continue
								} else {
									horarios_fecha.push(fecha)
								}
							}
						}

						horarios[i].dataValues["Horarios"][j].dataValues["fechas"] = horarios_fecha
					}
				}
			}

			res.status(200).json({ horarios })

		}).catch(err => {
			console.log(err)
		})
	}).catch(err => {
		console.log(err)
	})
})

module.exports = router;