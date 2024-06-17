const { User, Project, UserProject } = require('../models');

module.exports = class ProjectController {
    // Buscando todos os projetos
    static async getProjects(req, res) {
        try {
            const projects = await Project.findAll();
            if(!projects) {
                res.status(404).json({message: "Nenhum projeto encontrado"});
            }
            res.status(200).json({projects})
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
    // Buscando dados de um projeto (caso o usuário faça parte do projeto)
    static async getLeaderProjects(req, res) {
        try {
            const projects = await Project.findAll({
                where: {
                    id_project_leader: req.body.user_id
                }
        });
            res.status(200).json({projects});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
    // Buscando todos os projetos que o usuário é lider
    static async getProject(req, res) {
        try {
            const project_id = req.params.id;
            const projects = await UserProject.findOne({
                where: {
                    idProject: project_id,
                    idUser: req.body.user_id,
                    user_status: "true"
                }
            });
            if(!projects) {
                return res.status(404).json({message: "Projeto não encontrado"})
            }
            const project = await Project.findByPk(projects.idProject);
            res.status(200).json({project});
        } catch(err) {
            res.status(500).json({error: err.message});
        }
    }
    // Criando novo projeto e definindo lider do projeto como true
    static async createProject(req, res) {
        try {
            const { title, description, delivery_date, user_id } = req.body;
            if(!title || !description || !delivery_date || !user_id) {
                res.status(400).json({message: "insira todas as informações!"});
                return;
            }
            
            const new_project = await Project.create({
                title: title,
                description: description,
                delivery_date: delivery_date,
                id_project_leader: user_id
            })
            await UserProject.create({
                idUser: user_id,
                idProject: await new_project.id,
                user_status: "true"
            })
            res.status(201).json({message: "Projeto criado com sucesso!"});
        }catch(err) {
            res.status(500).json({message: err.message})
        }
    }
    // Update de projeto
    static async updateProject(req, res) {
        try {
            const project_id = req.params.id;
            const { title, description, delivery_date, user_id } = req.body;
            const project = await Project.findOne({where: {id: project_id, id_project_leader: user_id}});
            if(!project) {
                return res.status(404).json({message: "projeto não encontrado"})
            }

            if(!title || !description || !delivery_date || !user_id) {
                res.status(400).json({message: "insira todas as informações!"});
                return;
            }
            
            project.update({
                title: title,
                description: description,
                delivery_date: delivery_date,
                id_project_leader: user_id
            })
            res.status(201).json({message: "Projeto atualizado com sucesso!"});
        }catch(err) {
            res.status(500).json({message: err.message})
        }
    }
    // Delete projeto
    static async deleteProject(req, res) {
        try {
            const project_id = req.params.id;
            const user_id = req.body.user_id;
            const project = await Project.findOne({where: {id: project_id, id_project_leader: user_id}});
            if(!project) {
                return res.status(404).json({message: "projeto não encontrado"})
            }
            
            await UserProject.destroy({where: {idProject: project_id}});
            await project.destroy()

            res.status(200).json({message: "Projeto deletado com sucesso!"});
        }catch(err) {
            res.status(500).json({message: err.message})
        }
    }
}
try {
    
} catch(err) {
    res.status(500).json({error: err.message});
}