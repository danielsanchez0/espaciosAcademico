var express = require('express');
var router = express.Router();

const { Op, QueryTypes } = require("sequelize");
const { sequelize } = require('../models/index');

const modelo = require("../models/index")
const HorarioMateria = modelo.horarioMateria
const GrupoHorario = modelo.Grupo_horario

router.post('/createhorario', (req, res) => {
    const { dia, inicio, final, espacio, grupo} = req.body;

    if (!dia || !inicio || !final || !espacio || !grupo) {
        return res.status(422).json({ error: "por favor, llena los campos" })
    }

    const horario = new HorarioMateria({
        dia,
        hora_inicial: inicio,
        hora_final: final,
        espacio
    })

    horario.save().then(result => {

        const grupohorario = new GrupoHorario({
            horario_id: result['id'],
            grupo_id: grupo
        })

        grupohorario.save().then(grupo =>{
            console.log("agregado")
             res.status(201).json({ horario: result })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err);
    })
})

router.get('/gethorariosfinal/:idespacio', async (req, res) => {
    await sequelize.query(

        `SELECT HorarioMateria.id as id,STR_TO_DATE(CONCAT('2022-06-01 ',hora_inicial,':00:00'),'%Y-%m-%d %H:%i:%s') as startDate,
        STR_TO_DATE(CONCAT('2022-06-01 ',hora_final,':00:00'),'%Y-%m-%d %H:%i:%s') as endDate,
        CONCAT('RRULE:INTERVAL=1;FREQ=WEEKLY;UNTIL=20231220T150000Z;BYDAY=',HorarioMateria.dia) as rRule,
        CONCAT(Materias.codigo," - ",Materias.nombre) as title,
        CONCAT('grupo: ',Grupos.grupo) as notes
        FROM HorarioMateria
        JOIN Grupo_horarios on Grupo_horarios.horario_id=HorarioMateria.id
        JOIN Grupos on Grupo_horarios.grupo_id=Grupos.id
        JOIN Materias ON Grupos.materia=Materias.id
        JOIN Espacios ON Espacios.id=HorarioMateria.espacio
        WHERE Espacios.id=:idespacio`
        , {
        replacements: { idespacio: req.params.idespacio },
        type: QueryTypes.SELECT,
        raw: true
    }
    ).then(horario => {



        res.status(200).json({ horario })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;