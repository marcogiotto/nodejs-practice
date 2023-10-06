const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {

    const { user, password } = req.body;

    if (!user || !password) return res.status(400).json({ message: 'User and password are required.' });


    try {
        let userData = await User.findOne({ userName: user }).exec();
        if (!userData) return res.sendStatus(401);
        const userValid = await bcrypt.compare(password, userData?.password);
        if (!userValid) return res.sendStatus(401);

        const roles = Object.values(userData.roles);
        const accessToken = jwt.sign({
            userInfo: {
                userName: userValid.userName,
                roles: roles
            }
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' });
        const refreshToken = jwt.sign({
            userInfo: {
                userName: userValid.userName
            }
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' });

        userData.refreshToken = refreshToken;

        await userData.save();

        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None'
        });
        return res.status(200).json({ message: 'Logueado', accessToken });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};

module.exports = {
    handleLogin
};