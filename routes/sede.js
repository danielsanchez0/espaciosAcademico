var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Sede = modelo.Sede

const {Op} = require("sequelize")

router.post('/createsede', (req, res) => {
    const { bloque, nombre, descripcion } = req.body;

    if (!bloque || !nombre || !descripcion) {
        return res.status(422).json({ error: "por favor, llena todos los campos" })
    }

    Sede.findOne({
        where: {
            bloque: bloque
        }
    }).then(data => {
        if (data) {
            return res.status(422).json({ error: "ya esta registrada esta sede" })
        }

        const sede = new Sede({
            bloque,
            nombre,
            descripcion
        })

        sede.save().then(result => {
            res.status(201).json({ sede: result })
        }).catch(err => {
            console.log(err)
        })
    }).catch(err => {
        console.log(err)
    })
})

router.get('/getsedes',(req,res)=>{
    Sede.findAll({
        order: [['bloque','ASC']],
        where: {
            estado: true
        }
    }).then(sedes =>{
        res.status(201).json({sedes:sedes})
    }).catch(err =>{
        console.log(err)
    })
})

router.delete('/deletesede/:sedeid',(req,res)=>{
    Sede.update(
    {
        estado: false
    },
    {
        where: {
            id: req.params.sedeid,
        }
    }).then(espacios => {
        res.status(201).json({ espacios })
    }).catch(err => {
        console.log(err)
    })
})

router.get("/getespacios/:sede_id", (req, res) => {

    Sede.findAll({
        where: {
            id:  req.params.sede_id
        },
        attributes: ["id","nombre","bloque","descripcion"],
        include: [{
            model: modelo.Espacio,
            attributes: ["id","nombre","descripcion","capacidad"],
            where: {
                estado: true
            },
            include: [
                {
                    model: modelo.espacio_tipo,
                    attributes: ["id","nombre"]
                }
            ]
        }]
    }).then(espacios => {
        res.status(201).json({ sede: espacios })
    }).catch(err => {
        console.log(err)
    })
})

module.exports = router;