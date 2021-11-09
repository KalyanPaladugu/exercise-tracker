const router=require('express').Router();
const { response } = require('express');
const Exercise=require('../models/exercise.model');

router.route('/').get((request,response)=>{
    Exercise.find().then(exercises=>response.json(exercises))
    .catch(error=>response.status(400).json('Error'+error))
})

router.route('/add').post((request,response)=>{
    const username=request.body.username;
    const description=request.body.description;
    const duration=Number(request.body.duration);
    const date=Date.parse(request.body.date);


    const newExercise=new Exercise({username,description,duration,date});
    newExercise.save()
    .then((data)=>response.json(data+'Exercise is Added'))
    .catch(error=>response.status(400).json('Error'+error))
})



router.route('/:id').get((req,res)=>{
     Exercise.findById(req.params.id)
     .then(exercise=>response.json(exercise))
     .catch(err => res.status(400).json('Error '+err))
})

router.route('/:id').delete((req,res)=>{
    Exercise.findByIdAndDelete(req.params.id)
    .then((data)=>response.json('Exercise is deleted'))
    .catch(err => res.status(400).json('Error '+err))
})


router.route('/update/:id').post((req,res)=>{
    Exercise.findById(req.params.id)
    .then(exercise=>
        {
            exercise.username=req.body.username;
            exercise.description=req.body.description;
            exercise.duration=Number(req.body.duration);
            exercise.date=Date.parse(req.body.date);

            exercise.save()
            .then((data)=> res.json(data+'Exercise Updated'))
            .catch(err=>res.status(400).json('Err'+err))
        })
    .catch(err => res.status(400).json('Error '+err))
})







module.exports=router