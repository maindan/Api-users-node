const router = require('express').Router();
const User = require('../controllers/userController');
const Project = require('../controllers/projetoController');
const checkToken = require('../controllers/checkToken');
const ProjectController = require('../controllers/projetoController');

router.get("/", (req, res) => {
    res.status(200).send('Api configurada e operante!');
})

// ROTAS DE USUARIO

router.get("/users", checkToken, User.getUsers);
router.get("/users/:id", checkToken, User.getUser);
router.post("/users/create", User.createUser);
router.put("/users/:id/update", checkToken, User.updateUser);
router.delete("/users/:id/delete", checkToken, User.deleteUser);

//rota de login
router.get("/login", User.login);
//rota de logout
router.get("/logout", User.logout);

// ROTAS DE PROJETOS

router.get("/projetos", Project.getProjects);
router.get("/projects/:id", checkToken, Project.getProject);
router.get("/project/leader", checkToken, Project.getLeaderProjects);
router.post("/projects/create", checkToken, ProjectController.createProject);
router.put("/projects/:id/update", checkToken, ProjectController.updateProject);
router.delete("/projects/:id/delete", checkToken, ProjectController.deleteProject);

module.exports = router;