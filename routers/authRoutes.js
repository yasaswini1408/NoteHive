const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.get('/check', (req, res) => {
    res.send("Auth route working")
})

router.post('/signup', authController.signup)

module.exports = router