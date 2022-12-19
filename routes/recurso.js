var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Recurso = modelo.Recurso

router.post('/createrecurso', (req, res) => {
    const { nombre, descripcion, estado, prestable, tipo_recurso , id_espacio } = req.body;

    if (!nombre || !estado, !prestable || !tipo_recurso || !id_espacio) {
        return res.status(422).json({ error: "por favor, llena los campos" })
    }

    const recurso= new Recurso({
        nombre,
        descripcion,
        estado,
        prestable,
        tipo_recurso,
        id_espacio
    })

    recurso.save().then(result => {
        res.status(201).json({ recurso: result })
    }).catch(err => {
        console.log(err);
    })
})

router.delete('/deleterecurso/:recursoid',(req,res)=>{
    Recurso.update(
    {
        activo: false
    },
    {
        where: {
            id: req.params.recursoid,
        }
    }).then(recurso => {
        console.log(recurso)
        res.status(201).json({ recurso })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/getrecursos/:espacioid', (req, res) => {
    
    Recurso.findAll({
        where: {
            id_espacio: req.params.espacioid,
            activo: true
        },
        attributes: ["id","nombre","descripcion","estado","prestable"],

    }).then(recursos => {
        res.status(201).json({ recursos: recursos })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;