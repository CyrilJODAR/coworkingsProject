const { Sequelize, DataTypes } = require('sequelize');
const setDataSample = require('./setDataSample')

const sequelize = new Sequelize('coworking_07_2023', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    logging: false
});

sequelize.authenticate()
    .then(() => console.log('La connexion à la base de données a bien été établie.'))
    .catch(error => console.log(`Ìmpossible de se connecter à la base de données ${error}`))

const defineCoworkingModel = require('../models/coworkingModelDefinition')
const defineUserModel = require('../models/userModelDefinition')
const defineRoleModel = require('../models/roleModelDefinition')
const defineReviewModel = require('../models/reviewModelDefinition')

const CoworkingModel = defineCoworkingModel(sequelize, DataTypes)
const UserModel = defineUserModel(sequelize, DataTypes)
const RoleModel = defineRoleModel(sequelize, DataTypes)
const ReviewModel = defineReviewModel(sequelize, DataTypes)

RoleModel.hasMany(UserModel)
UserModel.belongsTo(RoleModel)

UserModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
ReviewModel.belongsTo(UserModel);

UserModel.hasMany(CoworkingModel, {
    foreignKey: {
        allowNull: false
    }
});
CoworkingModel.belongsTo(UserModel);

CoworkingModel.hasMany(ReviewModel, {
    foreignKey: {
        allowNull: false
    }
});
ReviewModel.belongsTo(CoworkingModel);

const initDb = () => {
    sequelize
        .sync({ force: true })
        .then(() => {
            setDataSample(CoworkingModel, UserModel, RoleModel, ReviewModel)
        })
}

module.exports = {
    initDb, sequelize, CoworkingModel, UserModel, RoleModel, ReviewModel
}