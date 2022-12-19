var express = require('express');
var router = express.Router();

const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require('../models/index');

const moment = require('moment');
const modelo = require("../models/index")
const Horario = modelo.Horario

/**
 * @swagger
 * /horario/createhorario:
 *   post:
 *     description: Registra un nuevo horario verificando que no exista cruce entre los horarios ya programados.
 *     tags:
 *     - horario
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Registrado correctamente.
 *         type: json
 *       401:
 *         description: Error de acceso, debe estar logueado para poder acceder a esta información.
 *         type: json
 *       422:
 *         description: El horario no se ha creado, debe llenar los campos correctamente.
 *         type: json
 *       423:
 *         description: Existe cruce.
 *         type: json
 */
router.post('/createhorario', (req, res) => {
    const { startDate, endDate, rRule, espacio_id } = req.body;

    if (!startDate || !endDate) {
        return res.status(422).json({ error: "por favor, llena los campos" })
    }

    const horario = new Horario({
        endDate,
        startDate,
        rRule : " ",
        espacio_id : 1
    })

    horario.save().then(result => {
        res.status(201).json({ horario: result })
    }).catch(err => {
        console.log(err);
    })
})

/**
 * @swagger
 * /horario/gethorarioespacio:
 *   get:
 *     description: Retorna todos los horarios registrados en el sistema durante un periodo de tiempo.
 *     tags:
 *     - horario
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Horarios retornados correctamente.
 *         type: json
 *       422:
 *         description: El horario no se ha creado, debe llenar los campos correctamente.
 *         type: json
 */
router.get('/gethorarios', (req, res) => {
    Horario.findAll({
        subQuery: false,
        attributes: ["id",
            "endDate",
            "startDate",
            "rRule"],
        include: [
            {
                model: modelo.Grupo,
                through: { attributes: [] },
                attributes: ["grupo"],
                include: {
                    model: modelo.Materia,
                    attributes: ["codigo", "nombre"],
                }
            },
            {
                model: modelo.Espacio,
                attributes: ["nombre"]
            }
        ],
    }
    ).then(horarios => {
        res.status(200).json({ horarios })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/gethorariosfinal/:idespacio', async (req, res) => {
    await sequelize.query(

        "SELECT Horarios.id,Horarios.startDate,Horarios.endDate,Horarios.rRule,Materias.nombre as title,Espacios.nombre as notes FROM `Horarios` JOIN Grupo_horarios ON Grupo_horarios.horario_id=Horarios.id JOIN Grupos ON Grupo_horarios.grupo_id=Grupos.id JOIN Materias ON Grupos.materia=Materias.id JOIN Espacios ON Espacios.id=Horarios.espacio WHERE Espacios.id=:idespacio", {
        replacements: { idespacio: req.params.idespacio },
        type: QueryTypes.SELECT,
        raw: false
    }
    ).then(horario => {
        console.log(horario)
        res.status(200).json({ horario })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;