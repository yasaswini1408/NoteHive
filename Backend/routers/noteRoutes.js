const express = require('express')
const router = express.Router()
const controller = require('../controllers/noteController')
const protect = require('../middleware/authMiddleware')

router.get('/', protect, controller.getAllNotes)
router.get('/:id', protect, controller.getNoteById)
router.post('/', protect, controller.createNote)
router.put('/:id', protect, controller.updateNote)
router.delete('/:id', protect, controller.deleteNote)

module.exports = router