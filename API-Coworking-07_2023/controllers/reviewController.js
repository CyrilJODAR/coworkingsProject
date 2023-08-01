const { UniqueConstraintError, ValidationError, Op } = require('sequelize')
const { ReviewModel, UserModel } = require('../db/sequelize')

exports.findAllReviews = (req, res) => {
    ReviewModel
        .findAll()
        .then(result => {
            res.json({ message: 'La liste des avis a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.createReview = (req, res) => {
    UserModel.findOne({ where: { username: req.username } })
        .then(user => {
            return ReviewModel.create({ ...req.body, UserId: user.id, CoworkingId: req.params.id })
                .then(result => {
                    res.json({ message: `création d'un avis`, data: result })
                })
        })
        .catch(error => {
            res.status((500)).json({ message: error.message })
        })
}

exports.updateReview = (req, res) => {
    ReviewModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                //throw new Error('Aucun coworking trouvé')
                res.status(404).json({ message: 'Aucun avis trouvé' })
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Avis modifié : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            if (error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: error.message })
        })
}