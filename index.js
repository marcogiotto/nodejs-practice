require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const credentials = require('./middleware/credentials');
const connectDB = require('./config/dataConf');

// const subdirRoutes = require('./routes/subdir');
const rootRoutes = require('./routes/root');
const employeesRoutes = require('./routes/api/employees');
const registerRoutes = require('./routes/register');
const authRoutes = require('./routes/auth');
const refreshTokenRoutes = require('./routes/refreshToken');
const logoutRoutes = require('./routes/logout');

const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');


connectDB();

const app = express();
const port = process.env.PORT | 4200;


app.use(logger);

// We need to set this to don't get cors error
app.use(credentials);
app.use(cors(corsOptions));
// const EventEmitter = require('events');

// const logEvents = require('./logEvents');

// class Emitter extends EventEmitter { };

// const myEmitter = new Emitter();

// myEmitter.on('log', (msg) => logEvents(msg));

//BUILT IN MIDDLEWARES

// There is no need form nome 4+ to use body-parser 
// We use this middleware to handle form data
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: false }));

//Middleware for JSON
app.use(express.json());

//Middleware for cookies
app.use(cookieParser());
//serve static files
app.use(express.static(path.join(__dirname, '/public')));
// app.use('/subdir', express.static(path.join(__dirname, '/public')));


// Rout handlers
app.use('/', rootRoutes);
// app.use('/subdir', subdirRoutes);
app.use('/register', registerRoutes);
app.use('/auth', authRoutes);
app.use('/refreshToken', refreshTokenRoutes);
app.use('/logout', logoutRoutes);

app.use(verifyJWT);
app.use('/employees/api', employeesRoutes);

app.get('/hello', (req, res, next) => {
    console.log('attempted');
    next();
});

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        return res.sendFile(path.join(__dirname, 'views', '404.html'));
    }
    if (req.accepts('json')) {
        return res.json({ error: '404 not found' })
    }
    res.type('txt').send('404 not found')
});


app.use(errorHandler);

mongoose.connection.once('open', () => {
    app.listen(port);
    console.log('connected')
});