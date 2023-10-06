const usersDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
};

require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {

    const cookies = req.cookies;
    console.log(cookies);
    if (!cookies?.jwt) return res.sendStatus(204); //No content

    const refreshTokenCookie = cookies.jwt;

    const userData = usersDb.users.find(person => person.refreshToken === refreshTokenCookie);

    if (!userData) {
        res.clearCookie('jwt', {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000,
            sameSite: 'None'
        });
        return res.sendStatus(204);
    }

    const otherUsers = usersDb.users.filter(person => person.refreshToken !== refreshTokenCookie);
    const currentUser = { ...userData, refreshToken: '' };
    usersDb.setUsers([...otherUsers, currentUser]);
    await fsPromises.writeFile(
        path.join(__dirname, '..', 'models', 'users.json'),
        JSON.stringify(usersDb.users)
    );

    res.clearCookie('jwt', {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'None'
    });

    res.sendStatus(204);
};

module.exports = {
    handleLogout
};