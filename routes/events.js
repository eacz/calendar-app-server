//api/events
const express = require('express');
const {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const validateJWT = require('../middlewares/validateJWT');
const Event = require('../models/Event');
const router = express.Router();

router.use(validateJWT)

router.get('/', getEvents);
router.post('/', createEvents);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
