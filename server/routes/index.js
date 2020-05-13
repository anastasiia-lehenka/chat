const express = require('express');
const router = express.Router();
const {
    signNewToken,
    comparePasswords
} = require('../helpers');
const {
    addUser,
    getUserByUsername
} = require('../db/actions/users');

router.use(express.json());

router.post('/login', async (req, res) => {
    const {
        username,
        password,
        image
    } = req.body;

    let user = await getUserByUsername(username);

    if (user) {
        const isValidPassword = await comparePasswords(password, user.password);
        if (!isValidPassword) return res.status(400).send('Invalid password');
    } else {
        try {
            user = await addUser(username, password, image);
        } catch(err) {
            res.status(400).send(err);
        }
    }

    const token = signNewToken({_id: user._id});
    res.send({token});
});

module.exports = router;
