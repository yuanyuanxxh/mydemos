var express = require('express');
var Photo = require('../../models/Photo');



var path = require('path');
var fs = require('fs');
var join = path.join;
var basename = path.basename;


function mkdir(dirpath,dirname){
    //判断是否是第一次调用
    if(typeof dirname === "undefined"){
        if(fs.existsSync(dirpath)){
            return;
        }else{
            mkdir(dirpath,path.dirname(dirpath));
        }
    }else{
        //判断第二个参数是否正常，避免调用时传入错误参数
        if(dirname !== path.dirname(dirpath)){
            mkdir(dirpath);
            return;
        }
        if(fs.existsSync(dirname)){
            fs.mkdirSync(dirpath)
        }else{
            mkdir(dirname,path.dirname(dirname));
            fs.mkdirSync(dirpath);
        }
    }
}



var router = express.Router();


/* GET chat page. */
router.get('/', function(req, res) {
    Photo.find({}, function(err, photos){
        if (err) return next(err);
        res.render('photo/photos', {
            title: 'Photos',
            photos: photos.reverse()
        });
    });
});


router.post('/', function(req, res, next){

    var dir = req.app.get('photos');
    var img = req.files.photo.image;

    var name = req.body.photo.name || img.name;
    var detail = req.body.photo.info || "";


    if (img.size == 0)
    {
        res.redirect('/photos');
        console.log('img size == 0!');
        return;
    }


    var filename = basename(img.path);

    var path = join(dir, filename);


    fs.rename(img.path, path, function(err){
        if (err) return next(err);

        Photo.create({
            name: name,
            path: basename(path),
            detail : detail
        }, function(err) {
            if (err) return next(err);
            res.redirect('/photos');
        });
    });
});




module.exports = router;




