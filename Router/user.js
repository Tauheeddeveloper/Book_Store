const express=require('express')
const router=express.Router()
const signup=require('../Controller/User-Controller')
router.post('/signup',signup)
module.exports=router