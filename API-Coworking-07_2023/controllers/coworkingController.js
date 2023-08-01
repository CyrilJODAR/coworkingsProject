const { UniqueConstraintError, ValidationError, Op, QueryTypes } = require('sequelize')
const { CoworkingModel, ReviewModel, sequelize } = require('../db/sequelize')

exports.findAllCoworkings = (req, res) => {
    CoworkingModel
        .findAll({ include: ReviewModel })
        .then(result => {
            res.json({ message: 'La liste des coworkings a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.findAllCoworkingsWithRawSql = (req, res) => {
    sequelize.query("SELECT name, rating FROM  `coworkings` LEFT JOIN `reviews` ON `coworkings`.`id` = `reviews`.`coworkingId`", { type: QueryTypes.SELECT })
        // .findAll({ include: ReviewModel })
        .then(result => {
            res.json({ message: 'La liste des coworkings a bien été récupérée.', data: result })
        })
        .catch(error => {
            res.status(500).json({ message: error })
        })
}

exports.findCoworkingByPk = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                res.status(404).json({ message: `L'élément ayant pour id ${req.params.id} n'existe pas.` })
            } else {
                res.json({ message: `L'élément a bien été récupéré.`, data: result })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `Une erreur est survenue : ${error}` })
        })
}

exports.createCoworking = (req, res) => {
    const newCoworking = req.body
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
            address: newCoworking.address,
            UserId : 1
        })
        .then((result) => {
            res.status(201).json({ message: 'Un coworking a bien été ajouté.', data: result })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })
}

exports.createCoworkingWithImage = (req, res) => {
    const newCoworking = JSON.parse(req.body.data);
    CoworkingModel
        .create({
            name: newCoworking.name,
            price: newCoworking.price,
            superficy: newCoworking.superficy,
            capacity: newCoworking.capacity,
            address: newCoworking.address,
            // UserId: newCoworking.UserId,
            UserId: 1,
            picture: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        })
        .then((result) => {
            res.status(201).json({ message: 'Un coworking a bien été ajouté.', data: result })
        })
        .catch((error) => {
            if (error instanceof UniqueConstraintError || error instanceof ValidationError) {
                return res.status(400).json({ message: error.message })
            }
            res.status(500).json({ message: `Une erreur est survenue :  ${error}` })
        })
}

exports.updateCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                //throw new Error('Aucun coworking trouvé')
                res.status(404).json({ message: 'Aucun coworking trouvé' })
            } else {
                return result
                    .update(req.body)
                    .then(() => {
                        res.json({ message: `Coworking modifié : ${result.dataValues.id} `, data: result })
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
exports.deleteCoworking = (req, res) => {
    CoworkingModel
        .findByPk(req.params.id)
        .then(result => {
            if (!result) {
                //throw new Error('Aucun coworking trouvé')
                res.status(404).json({ message: 'Aucun coworking trouvé' })
            } else {
                return result
                    .destroy()
                    .then(() => {
                        res.json({ message: `Coworking supprimé : ${result.dataValues.id} `, data: result })
                    })
            }
        })
        .catch(error => {
            res.status(500).json({ message: `${error}` })
        })
}

exports.findAllCoworkingsByReview = (req, res) => {
    const minRate = req.query.minRate || 4
    CoworkingModel.findAll({
        include: {
            model: ReviewModel,
            where: {
                rating: { [Op.gte]: 4 }
            }
        }
    })
        .then((elements) => {
            const msg = 'La liste des coworkings a bien été récupérée en base de données.'
            res.json({ message: msg, data: elements })
        })
        .catch((error) => {
            const msg = 'Une erreur est survenue.'
            res.status(500).json({ message: msg })
        })
}

exports.findAllCoworkingsByReviewSQL = (req, res) => {
    return sequelize.query('SELECT name, rating FROM `coworkings` LEFT JOIN `reviews` ON `coworkings`.`id` = `reviews`.`coworkingId`',
        {
            type: QueryTypes.SELECT
        }
    )
        .then(coworkings => {
            const message = `Il y a ${coworkings.length} coworkings comme résultat de la requête en SQL pur.`
            res.json({ message, data: coworkings })
        })
        .catch(error => {
            const message = `La liste des coworkings n'a pas pu se charger. Reessayez ulterieurement.`
            res.status(500).json({ message, data: error })
        })
}