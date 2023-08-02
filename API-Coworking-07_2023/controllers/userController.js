const { UniqueConstraintError, ValidationError } = require('sequelize')
const { UserModel } = require('../db/sequelize')
const bcrypt = require('bcrypt')

exports.findAllUsers = (req, res) => {
    UserModel.scope('withoutPassword')
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des utilisateurs a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.updateUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return bcrypt.hash(req.body.password, 10)
                    .then(hash => {
                        const dataUser = { ...req.body, password: hash }
                        return result
                            .update(dataUser)
                            .then(() => {
                                res.json({ message: `Utilisateur modifié : ${result.dataValues.id} `, data: result })
                            })
                    })

            }
        })
        .catch(error => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}

exports.deleteUser = (req, res) => {
    UserModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: 'Aucun utilisateur trouvé' })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        result.password = 'hidden'
                        res.json({ message: `utilisateur supprimé : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `${error}` })
        })
}

exports.getUserbyId = (req, res) => {
    UserModel
      .findByPk(req.params.id)
      .then((user) => {
        res.status(200).json({ data: user });
      })
      .catch((error) => {
        res.satus(500).json({
          message: `Nous n'avons pu récupérer les donnéess -> ${error}`,
        });
      });
  };