const router = require('express').Router();
//username:String;
const authCheck = (req, res, next) => {
    if(!req.user){
        res.redirect('/auth/login');
    } else {
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    res.render('profile',{user:req.user});
});
/*router.get('/', (req, res) => {
res.send('good'+req.user.username);});*/
module.exports = router;

