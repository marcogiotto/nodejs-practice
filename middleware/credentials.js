const credentials = (req, res, next) => {
    // const origin = req.headers.origin;
    res.header('Access-control-Allow-Credentials', true);
    next();
};

module.exports = credentials;