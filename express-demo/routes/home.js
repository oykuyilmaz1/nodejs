const express = require('express');
const router = express.Router();
router.get('/', (req, res) => {
    res.render('index',{title:'oyku',message:'helloyku'})
});
module.exports = router;