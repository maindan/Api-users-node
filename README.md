# API de Gerenciamento de Projetos e Usuários

Esta API foi desenvolvida para gerenciar projetos e usuários. Ela permite criar, atualizar, deletar e listar projetos e usuários, além de gerenciar associações entre usuários e projetos. Também possui funcionalidades de registro de usuários, login e logout.

## Estrutura do Projeto

O projeto está estruturado da seguinte forma:
- **Migrations:** Define a estrutura das tabelas no banco de dados.
- **Controllers:** Contém a lógica de negócios para gerenciar usuários e projetos.
- **Routes:** Define as rotas da API.

## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Sequelize (ORM)**
- **Banco de Dados MySQL**
- **Bcrypt para encriptar as senhas**
- **JSON Web Token**

## Estrutura das Tabelas

### Tabela `project`

| Coluna            | Tipo          | Descrição                                    |
|-------------------|---------------|----------------------------------------------|
| id                | INTEGER       | Identificador único do projeto               |
| title             | STRING        | Título do projeto                            |
| description       | STRING        | Descrição do projeto                         |
| delivery_date     | DATEONLY      | Data de entrega do projeto                   |
| project_status    | STRING        | Status do projeto (padrão: 'EM ABERTO')      |
| id_project_leader | INTEGER       | ID do líder do projeto (referência à tabela `user`) |
| createdAt         | DATE          | Data de criação                              |
| updatedAt         | DATE          | Data de atualização                          |

### Tabela `user_project`

| Coluna      | Tipo     | Descrição                                 |
|-------------|----------|-------------------------------------------|
| id          | INTEGER  | Identificador único da associação         |
| idUser      | INTEGER  | ID do usuário (referência à tabela `user`)|
| idProject   | INTEGER  | ID do projeto (referência à tabela `project`)|
| user_status | STRING   | Status do usuário no projeto (padrão: 'false') |
| createdAt   | DATE     | Data de criação                           |
| updatedAt   | DATE     | Data de atualização                       |

## Rotas da API

### Rotas de Usuário

- **GET /users** - Lista todos os usuários (Requer autenticação)
- **GET /users/:id** - Obtém os detalhes de um usuário específico (Requer autenticação)
- **POST /users/create** - Cria um novo usuário
- **PUT /users/:id/update** - Atualiza os dados de um usuário específico (Requer autenticação)
- **DELETE /users/:id/delete** - Deleta um usuário específico (Requer autenticação)
- **GET /login** - Realiza o login do usuário
- **GET /logout** - Realiza o logout do usuário

### Rotas de Projetos

- **GET /projetos** - Lista todos os projetos
- **GET /projects/:id** - Obtém os detalhes de um projeto específico (Requer autenticação)
- **GET /project/leader** - Obtém todos os projetos liderados pelo usuário autenticado (Requer autenticação)
- **POST /projects/create** - Cria um novo projeto (Requer autenticação)
- **PUT /projects/:id/update** - Atualiza os dados de um projeto específico (Requer autenticação)
- **DELETE /projects/:id/delete** - Deleta um projeto específico (Requer autenticação)

## Autenticação

Algumas rotas requerem autenticação. Isso é verificado pela função `checkToken`, que deve ser implementada para validar o token de autenticação do usuário.

## Contribuição

Se desejar contribuir com o projeto, siga os passos abaixo:

1. Faça um fork do repositório.
2. Crie uma nova branch: `git checkout -b minha-feature`
3. Faça as alterações e commit: `git commit -m 'Minha nova feature'`
4. Envie para o repositório remoto: `git push origin minha-feature`
5. Abra um pull request.

## Licença

Este projeto está licenciado sob a licença MIT.
