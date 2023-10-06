const usersDb = {
    users: require('../models/users.json'),
    setUsers: function (data) {
        this.users = data;
    }
};

const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {

    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;

    const userData = usersDb.users.find(person => person.refreshToken === refreshToken);

    if (!userData) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || userData.userName !== decoded.userName) return res.sendStatus(403);
            const roles = Object.values(userData.roles);
            const accessToken = jwt.sign(
                {
                    userInfo: {
                        userName: decoded.userName,
                        roles: roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );
            res.json({ accessToken });
        }
    );


};

module.exports = {
    handleRefreshToken
};