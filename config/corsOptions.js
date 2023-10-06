//Cross Origin Resource Sharing
const whiteList = [
    'http://localhost:4200',
    'https://www.google.com'
];

const corsOptions = {
    origin: (origin, callback) => {
        if (whiteList.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('not allow by cors'));
        }
    },
    optionsSuccessStatus: 200
};

module.exports = corsOptions;