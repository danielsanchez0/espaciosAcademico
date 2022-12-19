var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Materia = modelo.Materia

router.get('/getmaterias/:materiaid',(req,res)=>{
    Materia.findAll({
        where: {
            id: req.params.materiaid
        },
        attributes: ["id","nombre"],
        include: [{
                model: modelo.Grupo,
                attributes: ["id", "grupo"],
                include: [{
                    model: modelo.horarioMateria,
                    through: { attributes: [] },
                }]
        }]
    }).then(grupos =>{
        res.status(201).json({grupos})
    }).catch(err =>{
        console.log(err)
    })
})

router.delete('/deletemateria/:materiaid',(req,res)=>{
    Materia.update(
    {
        estado: false
    },
    {
        where: {
            id: req.params.materiaid,
        }
    }).then(materia => {
        console.log(materia)
        res.status(201).json({ materia })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/createmateria', (req, res) => {
    const { codigo, nombre, cupos_maximos, departamento_id } = req.body;

    if (!codigo || !nombre || !cupos_maximos || !departamento_id) {
        return res.status(421).json({ error: "por favor, llena todos los campos" })
    }

    Materia.findOne({
        where: {
            codigo: codigo
        }
    }).then(data => {
        if (data) {
            res.status(422).json({ error: "ya existe una materia registrada con este codigo." })
        }

        const materia = new Materia({
            codigo,
            nombre,
            cupos_maximos,
            departamento_id
        })

        materia.save().then(result => {
            res.status(201).json({ materia: result })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/editmateria/:materiaid', (req, res) => {
    const { codigo, nombre, cupos_maximos} = req.body;

    if (!codigo || !nombre || !cupos_maximos) {
        return res.status(421).json({ error: "por favor, llena todos los campos" })
    }

    Materia.update({
        codigo:codigo,
        nombre:nombre,
        cupos_maximos:cupos_maximos
    },{
        where: {
            id: req.params.materiaid
        }
    }).then(materia => {
        console.log(materia)
        res.status(201).json({ materia })
    }).catch(err => {
        console.log(err)
    })

   
})

router.get('/getmismaterias', (req, res) => {
    Materia.findAll({
        include: [{
            model: modelo.Grupo,
            include: [{
                model: modelo.User
            }]
        }]
    }).then(materias => {
        res.status(201).json({ materias })
    })
})

module.exports = router;