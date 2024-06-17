require('dotenv').config()
const jwt = require("jsonwebtoken");
const secret = process.env.SECRET;

async function checkToken(req, res, next) {
    const tokenHeader = req.headers['authorization'];
    const token = tokenHeader && tokenHeader.split(" ")[1];
    console.log(tokenHeader);
    if(!token) {
        return res.status(400).send({message: "credenciais inválidas"});
    }

    try {
        jwt.verify(token, secret);
        next()
    } catch(err) {
        return res.status(400).send({message: "Token inválido"})
    }
}

module.exports = checkToken