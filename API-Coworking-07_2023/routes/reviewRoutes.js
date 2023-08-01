const express = require('express')
const router = express.Router()
const reviewController = require('../controllers/reviewController')
const authController = require('../controllers/authController')
const { ReviewModel } = require('../db/sequelize')

router
    .route('/')
    .get(reviewController.findAllReviews)

router
    .route('/:id')
    .post(authController.protect, reviewController.createReview)
    .put(authController.protect, authController.restrictToOwnUser(ReviewModel), reviewController.updateReview)

module.exports = router