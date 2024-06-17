'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Project extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        as:'project_leader',
        foreignKey: 'id_project_leader'
      })

      this.belongsToMany(models.User, {
        through: 'user_project',
        foreignKey: 'idProjeto',
        as: 'project',
      })
    }
  }
  Project.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    delivery_date: DataTypes.DATEONLY,
    project_status: DataTypes.STRING,
    id_project_leader: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Project',
    tableName: 'project'
  });
  return Project;
};