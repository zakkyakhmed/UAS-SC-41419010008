var express = require('express');
var router = express.Router();

/* GET home page. */
let i = 0;
let r = 0;
router.get('/set/:i/:r/', function(req, res, next) {
  i = req.params.i;
  r = req.params.r;
  res.json({
    i:i, 
    r:r
  })
});

router.get('/:sel', function(req, res, next) {
  if(req.params.sel == "p"){
    res.render(
      'index', 
      { 
        title: 'DNNJS',
        i: i,
        r: r
      }
    );
  }else{
    res.redirect(`/api/classify/${i}/${r}`)
  }
});

module.exports = router;
