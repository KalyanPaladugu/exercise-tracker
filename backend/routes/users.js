const router=require('express').Router();
const User=require('../models/user.model');

router.route('/').get((request,response)=>{
    User.find().then(users=>response.json(users))
    .catch(error=>response.status(400).json('Error'+error))
})

router.post('/add',(request,response)=>{
    const username=request.body.username
    const newUser=new User({username});
    newUser.save()
    .then((data)=>response.json(data))
    .catch(error=>response.status(400).json('Error'+error))
})

module.exports=router