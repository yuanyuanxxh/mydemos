var express = require('express');
var Photo = require('../../models/Photo');
var router = express.Router();

var path = require('path');
var join = path.join;

/* GET commnets page. */
router.get('/', function(req, res) {
    var id = req.query.id;
    var dir = req.app.get('photos');
    console.log("id:"+id);
    Photo.findById(id, function(err, photo){
        if (err) return next(err);
        var path = join(dir, photo.path);
        var comments = photo.comments || [];
        comments.reverse();
        res.render('photo/comments', { path: photo.path, comments: comments});
    });
});

router.post('/', function(req, res, next){
    var dir = req.app.get('photos');

    var id = req.query.id;
    var content = req.body.comment.content;
    var username = req.body.comment.username;

    Photo.findById(id, function(err, photo){
        if (err) return next(err);

        var date_now = new Date();
        var date = date_now.toLocaleDateString();
        var time = date_now.toLocaleTimeString();

        photo.comments.push({username:username, content: content, time: date + ' ' + time});
        photo.save();
        var comments = photo.comments || [];
        comments.reverse();
        res.render('photo/comments', { path: photo.path, comments: comments});
    });
});

module.exports = router;


