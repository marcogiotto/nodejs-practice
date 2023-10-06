const bcrypt = require('bcrypt');

const User = require('../models/User');

const handleNewUser = async (req, res) => {
    const { user, password } = req.body;

    if (!user || !password) {
        res.status(400).json({ error: 'Username and password are required' });
    }



    try {
        const duplicate = await User.findOne({ userName: user }).exec();

        if (duplicate) return res.sendStatus(409);

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await User.create({
            userName: user,
            password: hashedPassword,
            roles: {
                User: 2001
            }
        });

        return res.status(200).json({ message: 'success', user: result });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    handleNewUser
}