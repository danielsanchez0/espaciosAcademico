var express = require('express');
var router = express.Router();

const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const { JWT_SECRET } = require("../keys")
const modelo = require("../models/index")
const User = modelo.User

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     description: Usado para solicitar crear un nuevo usuario.
 *     tags:
 *     - usuario
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Usuario creado correctamente.
 *         type: json
 *       401:
 *         description: Error de acceso, debe estar logueado para poder acceder a esta información.
 *         type: json
 *       422:
 *         description: El usuario no se ha creado, debe llenar todos los campos.
 *         type: json
 *       423:
 *         description: El usuario ya existe.
 *         type: json
 */
router.post('/signup', (req, res) => {
	const { nombre, email, password } = req.body;

	if (!email || !password || !nombre) {
		res.status(422).json({ error: "añade todos los campos, por favor" });
	}

	User.findOne({ where: { email: email } }).then((savedUser) => {
		if (savedUser) {
			return res.status(423).json({ error: "el usuario ya existe" });
		}

		bcrypt.hash(password, 12).then(hashedpassword => {
			const user = new User({
				nombre,
				email,
				password: hashedpassword,
			})
			user.save().then(usuario => {
				res.status(201).json({ message: "usuario guardado" });
			}).catch(err => {
				console.log(err)
			})
		}).catch(err => {
			console.log(err)
		})
	})
})

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     description: Usado para loguearse en el sistema.
 *     tags:
 *     - usuario
 *     produces:
 *       - application/json
 *     responses:
 *       201:
 *         description: Usuario logueado correctamente.
 *         type: json
 *       405:
 *         description: Error de acceso, debe ingresar todos los datos.
 *         type: json
 *       422:
 *         description: El usuario no se ha logueado, contraseña incorrecta.
 *         type: json
 *       423:
 *         description: Contraseña incorrecta.
 *         type: json
 */
router.post('/signin', (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(405).json({ error: "incorrecto" })
	}

	User.findOne({
		where: { email: email },
		include: {
			model: modelo.Roles,
			attributes: ["nombre"],
		},
	}).then(savedUser => {
		if (!savedUser) {
			return res.status(422).json({ error: "email o contraseña invalidos" })
		}

		bcrypt.compare(password, savedUser.password).then(doMatch => {
			if (doMatch) {
				const token = jwt.sign({ _id: savedUser.id }, JWT_SECRET);
				const { id, nombre, email, Roles } = savedUser

				const rolesLista = Roles.map(function (rol) {
					return rol.nombre;
				});

				res.status(201).json({ token, user: { id, nombre, email, roles: rolesLista } })
			} else {
				return res.status(423).json({ error: "contraseña incorrecta" })
			}
		}).catch(err => {
			console.log(err)
		})
	})
})

module.exports = router;