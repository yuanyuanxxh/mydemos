var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var method_override = require('method-override');

var routes = require('./routes/index');
var users = require('./routes/users');
var resume = require('./routes/resume');
var weather = require('./routes/weather');
var chat = require('./routes/chat');
var index2 = require('./routes/index2');
var photo_photos = require('./routes/photo/photos');
var photo_comments = require('./routes/photo/comments');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('photos', __dirname + '/public/photos');



app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(multiparty());
app.use(method_override());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', routes);
app.use('/users', users);
app.use('/resume',resume);
app.use('/weather', weather);
app.use('/chat', chat);
app.use('/index2', index2);
app.use('/photos', photo_photos);
app.use('/comments', photo_comments);




/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
