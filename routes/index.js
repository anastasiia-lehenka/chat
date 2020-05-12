const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const validate = require('../validation');
const jwt = require('jsonwebtoken');

router.use(express.json());

router.post('/login', async (req, res) => {
    const {
        username,
        password,
        image
    } = req.body;

    const validationError = validate(req.body);
    if (validationError) return res.status(400).send(validationError);

    const existingUser = await User.findOne({username});
    if (existingUser) {
        const isValidPassword = await bcrypt.compare(password, existingUser.password);
        if (!isValidPassword) return res.status(400).send('Invalid password');

        res.send({
            id: existingUser._id,
            username: existingUser.username,
            image: existingUser.image,
            isAdmin:  existingUser.isAdmin,
            isOnline: existingUser.isOnline
        });
    } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            password: hashedPassword,
            image,
            isAdmin: false,
            isOnline: true
        });

        try {
            const token = jwt.sign({_id: newUser._id}, 'token', { expiresIn: '6h' });

            await newUser.save();
            res.send({
                user: {
                    id: newUser._id,
                    username: newUser.username,
                    image: newUser.image,
                    isAdmin: newUser.isAdmin,
                    isOnline: newUser.isOnline
                },
                token
            });
        } catch(err) {
            res.status(400).send(err);
        }
    }
});

module.exports = router;
