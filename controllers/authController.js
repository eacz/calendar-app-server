const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateJWT = require('../helpers/jwt');

const createUser = async (req, res) => {
    const { email } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res
                .status(400)
                .json({ ok: false, msg: 'That email is already registered.' });
        }
        user = new User(req.body);

        //encrypt pass
        const salt = bcryptjs.genSaltSync();
        user.password = bcryptjs.hashSync(user.password, salt);

        await user.save();
        //jwt
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            uid: user.id,
            name: user.name,
            token,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res
                .status(400)
                .json({ ok: false, msg: "That user doesn't exists" });
        }
        const validPassword = bcryptjs.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ ok: false, msg: 'Invalid password' });
        }
        //jwt
        const token = await generateJWT(user.id, user.name);

        res.json({ ok: true, uid: user.id, name: user.name, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: 'error' });
    }
};

const revalidateUser = async (req, res) => {
    const { uid, name } = req;
    try {
        const token = await generateJWT(uid, name);
        res.json({ ok: true, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, msg: "Can't generate the token" });
    }
};

module.exports = {
    createUser,
    loginUser,
    revalidateUser,
};
