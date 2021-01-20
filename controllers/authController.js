const User = require('../models/User');

const createUser = async (req, res) => {
    // const { name, email, password } = req.body;

    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ ok: true });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'error' });
    }
};

const loginUser = (req, res) => {
    const { email, password } = req.body;

    res.json({ email, password });
};

const revalidateUser = (req, res) => {
    res.json('ok revalidate');
};

module.exports = {
    createUser,
    loginUser,
    revalidateUser,
};
