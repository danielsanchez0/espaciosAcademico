var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Departamento = modelo.Departamento

router.post('/createdepartamento', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(422).json({ error: "por favor, llena todos los campos" })
    }

    const departamento = new Departamento({
        nombre,
        descripcion
    })

    departamento.save().then(result => {
        Departamento.findAll({}).then(deptos =>{
            res.status(201).json({departamentos:deptos})
        }).catch(err =>{
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

router.post('/editdepartamento/:dptoid', (req, res) => {
    const { nombre, descripcion } = req.body;

    if (!nombre || !descripcion) {
        return res.status(422).json({ error: "por favor, llena todos los campos" })
    }

    Departamento.update({
        nombre:nombre,
        descripcion:descripcion
    },{
        where: {
            id: req.params.dptoid
        }
    }).then(departamento => {
        console.log(departamento)
        res.status(201).json({ departamento })
    }).catch(err => {
        console.log(err)
    })

    
})

router.get('/getdepartamentos', (req,res)=>{
    Departamento.findAll({
        where: {
            estado: true
        }
    }).then(deptos =>{
        res.status(201).json({departamentos:deptos})
    }).catch(err =>{
        console.log(err)
    })
})

router.delete('/deletedepartamento/:deptoid',(req,res)=>{
    Departamento.update(
    {
        estado: false
    },
    {
        where: {
            id: req.params.deptoid,
        }
    }).then(departamento => {
        console.log(departamento)
        res.status(201).json({ departamento })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/getmaterias/:id', (req, res) => {
    
    Departamento.findAll({
        where: {
            id: req.params.id,
        },
        attributes: ["id","nombre","descripcion"],
        include: [
            {
                model: modelo.Materia,
                attributes: ["id", "codigo", "nombre","cupos_maximos"],
                where: {
                    estado: true
                }
            }
        ]
    }).then(materias => {
        res.status(201).json({ departamento: materias })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;