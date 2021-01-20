const jwt = require('jsonwebtoken');

const validateJWT = (req, res, next) => {
    //x-auth-token
    const token = req.header('x-auth-token');
    if (!token) {
        return res.json(401).json({ ok: false, msg: 'Missing token' });
    }
    try {
        const { uid, name } = jwt.verify(token, process.env.SECRET_KEY);
        req.uid = uid;
        req.name = name;
    } catch (error) {
        return res.status(401).json({ ok: false, msg: 'Invalid token' });
    }

    next();
};

module.exports = validateJWT;
