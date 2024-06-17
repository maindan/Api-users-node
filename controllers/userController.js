// imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { User } = require('../models');
require('dotenv').config();

// variável secret e quantidade de Salts
const secret = process.env.SECRET;
const saltHash = process.env.SALT;

module.exports = class UserController {
    // mostrar todos os usuários
    static async getUsers(req, res) {
        try {
            const users = await User.findAll();
            if(!users) {
                res.status(404).json({message: "Nenhum usuário encontrado"});
            }
            res.status(200).json({users})
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
    // mostrar dado do usuário
    static async getUser(req, res) {
        try {
            const user_id = req.body.user_id;
            const userReq = req.params.id;
            if(user_id != userReq) {
                return res.status(500).json({message: 'Usuário inválido!'})
            }
            const userData = await User.findByPk(user_id);
            res.status(200).json({userData});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
    // criar novo usuário
    static async createUser(req, res) {
        try {
            const { name, email, username, password } = req.body;
            
            if(!name || !email || !username || !password) {
                return res.status(400).send({message: "Insira todos os dados!"});
            }
            
            const safePassword = await bcrypt.hash(password, parseInt(saltHash));
            
            await User.create({
                name: name,
                email: email,
                username: username,
                password: safePassword
            })
            
            res.status(200).send({message: "usuário criado com sucesso!"})
            
        }
        catch(err) {
            if(err.name == "SequelizeUniqueConstraintError") {
                res.status(400).send({message: "usuário já existe!"})
            } else {
                res.status(500).send({message: "Um erro ocorreu"})
                console.log(err)
            }
        }
    }
    // atualizar usuário
    static async updateUser(req, res) {
        try {
            const user_id = req.body.user_id;
            const userReq = req.params.id;
            if(user_id != userReq) {
                return res.status(500).json({message: 'Usuário inválido!'})
            }
            
            const user = await User.findByPk(user_id);
            
            const { name, email, username, password } = req.body;
            
            if(!name || !email || !username || !password) {
                return res.status(400).send({message: "Insira todos os dados!"});
            }
            
            const safePassword = await bcrypt.hash(password, parseInt(saltHash));
            
            await user.update({
                name: name,
                email: email,
                username: username,
                password: safePassword
            })
            
            res.status(200).send({message: "Usuário atualizado com sucesso!"})
            
        }
        catch(err) {
            if(err.name == "SequelizeUniqueConstraintError") {
                res.status(400).send({message: "usuário já existe!"})
            } else {
                res.status(500).send({message: "Um erro ocorreu"})
                console.log(err)
            }
        }
    }
    // deletar usuário
    static async deleteUser(req, res) {
        try {
            const user_id = req.body.user_id;
            const userReq = req.params.id;
            if(user_id != userReq) {
                return res.status(500).json({message: 'usuário inválido!'})
            }
            const user = await User.findByPk(user_id);
            user.destroy();
            res.status(200).json({message: "Usuário deletado com sucesso!"});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
        
    }
    // login
    static async login(req, res) {
        const { username, password } = req.body;
        
        if(!username || !password) {
            return res.status(400).send({message:"É obrigatório inserir usuário e senha!"})
        }
        
        const checkUser = await User.findOne({ where: {username: username}});
        
        if(!checkUser) {
            return res.status(400).send({message: "usuário não encontrado!"})
        }
        
        const passMatch = await bcrypt.compare(password, checkUser.password);
        
        if(!passMatch) {
            return res.status(400).send({message: "Senha inválida!"});
        }
        
        try {
            const token = jwt.sign({
                id: checkUser.id
            },
            secret,
            { expiresIn: 10000 }
        )
        
        res.status(200).send({message:"autenticação realizada com sucesso!", user_id: checkUser.id, token});
        
    } catch(err) {
        res.status(500).send({message: "Um erro ocorreu"})
    }
    }
    // logouts
    static logout(req, res) {
        res.json({auth: false, token: null, user_id: null});
    }
}