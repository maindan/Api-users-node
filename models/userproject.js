'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProject extends Model {
    static associate(models) {
     
    }
  }
  UserProject.init({
    idUser: DataTypes.INTEGER,
    idProject: DataTypes.INTEGER,
    user_status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProject',
    tableName: 'user_project'
  });
  return UserProject;
};