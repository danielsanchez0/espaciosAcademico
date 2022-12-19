const jwt = require('jsonwebtoken');
const {JWT_SECRET} = require('../keys');

const modelo = require("../models/index")
const User = modelo.User

module.exports = (req,res,next)=>{
	const {authorization} = req.headers;

	if(!authorization){
		return res.status(401).json({error:"you must be logged"})
	}

	const token = authorization.replace("Bearer ","");

	jwt.verify(token,JWT_SECRET,(err,payload)=>{
		if(err){
			return res.status(401).json({error:"you must be logged"})
		}

		const {_id} = payload

		User.findOne({
			where: {
				id:_id
			}
		}).then(userdata=>{
			
			req.user = userdata;
			next();
		})	
	})
}