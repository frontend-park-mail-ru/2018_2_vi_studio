const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const sassMiddleware = require('node-sass-middleware');

const compilePug = require('./pug_compile');

compilePug('public');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
        src: path.join(__dirname, 'src'),
        dest: path.join(__dirname, 'build'),
        indentedSyntax: false, // true = .sass and false = .scss
        sourceMap: true,
    }));
app.use('/src', express.static(path.join(__dirname, 'src')));

const router = express.Router();
router.get('*', function(req, res, next) {
    res.sendfile('src/index.html');
});

app.use('/', router);

module.exports = app;
