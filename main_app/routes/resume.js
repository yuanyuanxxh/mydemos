var express = require('express');
var router = express.Router();

/* GET resume page. */
router.get('/', function(req, res) {
    res.render('resume', { title: 'Express' });
});

module.exports = router;