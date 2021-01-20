//api/events
const express = require('express');
const {
    getEvents,
    createEvents,
    updateEvent,
    deleteEvent,
} = require('../controllers/eventController');
const validateJWT = require('../middlewares/validateJWT');
const router = express.Router();
const { check } = require('express-validator');
const validateFields = require('../middlewares/validateFields');
const isDate = require('../helpers/isDate');

router.use(validateJWT);

router.get('/', getEvents);
router.post(
    '/',
    [
        check('title', 'The title is required').not().isEmpty(),
        check('dateStart', 'The start date is required').custom(isDate),
        check('dateEnd', 'The end date is required').custom(isDate),
        validateFields,
    ],
    createEvents
);
router.put('/:id', updateEvent);
router.delete('/:id', deleteEvent);

module.exports = router;
