const express = require('express')
const router = express.Router()
const coworkingController = require('../controllers/coworkingController')
const authController = require('../controllers/authController')
const { CoworkingModel } = require('../db/sequelize')
const multer = require('../middleware/multer-config');

router
    .route('/')
    .get(coworkingController.findAllCoworkings)
    // .post(authController.protect, authController.restrictTo("editor"), coworkingController.createCoworking)
    .post(coworkingController.createCoworking)


router
    .route('/withImg')
    .post(authController.protect, authController.restrictTo("editor"), multer, coworkingController.createCoworkingWithImage)

router
    .route('/withReview')
    .get(coworkingController.findAllCoworkingsByReview)

router
    .route('/rawSql')
    .get(coworkingController.findAllCoworkingsWithRawSql)


router
    .route('/:id')
    .get(coworkingController.findCoworkingByPk)
    .put(
        authController.protect, 
        authController.restrictToOwnUser(CoworkingModel),
        coworkingController.updateCoworking)
    .delete(
        authController.protect,
        authController.restrictToOwnUser(CoworkingModel),
        coworkingController.deleteCoworking)


module.exports = router