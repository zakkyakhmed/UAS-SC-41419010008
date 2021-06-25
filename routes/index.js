var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:i/:r/:sel', function(req, res, next) {
  if(req.params.sel == "p"){
    res.render('index', { title: 'DNNJS' });
  }else{
    res.redirect(`/api/classify/${req.params.i}/${req.params.r}`)
  }
});

module.exports = router;
