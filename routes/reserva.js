var express = require('express');
var router = express.Router();

const modelo = require("../models/index")
const Reserva = modelo.Reserva

const requireLogin = require('../middleware/requireLogin');

router.post('/createreserva/:espacioid', requireLogin, (req, res) => {
    const { title, notes, startDate, endDate} = req.body;

    console.log(req.body)

    if (!title || !notes, !startDate || !endDate || !req.params.espacioid) {
        return res.status(422).json({ error: "por favor, llena los campos" })
    }

    console.log(req.user.id)

    const reserva= new Reserva({
        title,
        notes,
        startDate,
        endDate,
        espacio:req.params.espacioid,
        userId: req.user.id,
        estado: "en revisión"
    })

    reserva.save().then(result => {
        res.status(201).json({ reserva: result })
    }).catch(err => {
        console.log(err);
    })
})

router.get("/reservasespacio/:espacioid",(req,res)=>{
    Reserva.findAll({
        where: {
            espacio: req.params.espacioid
        }
    }).then(reservas =>{
        res.status(200).json({reservas})
    }).catch(err => {
        console.log(err)
    })
})

router.get("/allreservas",(req,res)=>{
    Reserva.findAll({}).then(reservas=>{
       res.status(200).json({reservas})
    }).catch(err=>{
        console.log(err);
    })
})

router.get("/misreservas",(req,res)=>{
    Reserva.findAll({
        usuario:req.user.id
    })
    .then(myposts=>{
        res.status(200).json({myposts})
    }).catch(err=>{
        console.log(err);
    })
})

router.delete('/deletereserva/:reservaid',(req,res)=>{
    Reserva.findOne({
        where: {
            id: req.params.reservaid,
        }
    }).exec((err,reserva)=>{
        if(err || !reserva){
            return res.status(422).json({error:err})
        }
  
        reserva.remove()
            .then(result=>{
                res.status(204).json(result)
            }).catch(errprocess=>{
                console.log(errprocess)
            })
    })
})

module.exports = router;