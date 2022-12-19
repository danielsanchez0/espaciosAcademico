var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Espacio_Tipo = modelo.espacio_tipo

router.get('/getespaciostipo', (req,res)=>{
    Espacio_Tipo.findAll({}).then(tipos =>{
        res.status(201).json({tipos:tipos})
    }).catch(err =>{
        console.log(err)
    })
})

module.exports = router;