const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../keys');

const modelo = require("../models/index")
const User = modelo.User

module.exports = (roles) => (req, res, next) => {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "you must be logged" })
    }

    const token = authorization.replace("Bearer ", "");
    jwt.verify(token, JWT_SECRET, (err, payload) => {
        if (err) {
            return res.status(401).json({ error: "you must be logged" })
        }

        const { id } = payload
        User.findOne({
            where: { id: id },
            include: {
                model: modelo.Roles,
                attributes: ["nombre"],
            },
        }).then(userdata => {

            const {Roles} = userdata

            const rolesUsuario = Roles.map(function(rol) {
                return rol.nombre;
            });

            common = roles.filter(x => rolesUsuario.indexOf(x) !== -1)

            if(common.length > 0){
                next()
            } else{
                res.status(409)
                res.send({error:"No tienes permiso"})
            }
        })
    })
}