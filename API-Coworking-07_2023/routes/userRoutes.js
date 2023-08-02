const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

router
    .route('/')
    .get(userController.findAllUsers)

router
    .route('/signup')
    .post(authController.signUp)

router
    .route('/login')
    .post(authController.login)

router
    .route('/:id')
    .delete(authController.protect, authController.restrictTo("admin"), userController.deleteUser)
    .get(userController.getUserbyId)
// .put(authController.protect, userController.updateUser)

module.exports = router