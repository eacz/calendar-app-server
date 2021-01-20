const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const {
    createUser,
    loginUser,
    revalidateUser,
} = require('../controllers/authController');
const validateFields = require('../middlewares/validateFields');
const validateJWT = require('../middlewares/validateJWT');

router.post(
    '/new',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        check(
            'password',
            'The password must have at least 6 characthers'
        ).isLength({ min: 6 }),
        validateFields
    ],
    createUser
);

router.post(
    '/',
    [
        check('email', 'The email is required').isEmail(),
        check(
            'password',
            'The password must have at least 6 characthers'
        ).isLength({ min: 6 }),
        validateFields
    ],
    loginUser
);

router.get('/renew', validateJWT, revalidateUser);

module.exports = router;
