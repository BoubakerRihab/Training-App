const express = require('express');
const router = express.Router();
const Session = require('../models/sessions');
const Formateur = require('../models/formateurs');
const Participant = require('../models/participants');
const User = require('../models/users');
 // get number of sessions
 router.get('/numbersessions', function(req,res,next) {
    Session.countDocuments(function(err,count){
        res.json(count);
    });
});
// get number of formateurs
router.get('/numberformateurs', function(req,res,next) {
    Formateur.countDocuments(function(err,count){
        res.json(count);
    });
});
// get number of participants
router.get('/numberparticipants', function(req,res,next) {
    Participant.countDocuments(function(err,count){
        res.json(count);
    });
});
//get all sessions
router.get('/sessions', function(req, res, next) {
   // res.send('Liste des sessions de formations');
    Session.find(function(err, sessions){
        res.json(sessions);
    });
});
//get session by track
router.get('/sessionbytrack/:track', function(req, res, next) {
    Session.find({track:req.params.track},function(err, sessions){
        res.json(sessions);
    });
});
//get all formateurs
router.get('/formateurs', function(req, res, next) {
     Formateur.find(function(err, formateurs){
         res.json(formateurs);
     });
 });


//get all participants
router.get('/participants', function(req, res, next) {
    Participant.find(function(err, participants){
        res.json(participants);
    });
});
//get one session
router.get('/onesession/:id', function(req, res, next) {
    // res.send('Liste des sessions de formations');
    Session.findOne({_id: req.params.id},function(err, sessions){
        res.json(sessions);
    });
});
//get number of session with specific track
router.get('/sessiontrack/:track',function(req,res,next){
    Session.countDocuments({track: req.params.track }, function (err, count) {
        res.json(count);
      });
});
//get le nombre d existance d un formateur dans les sessions
router.get('/sessionformateur/:formateurid',function(req,res,next){
    Session.countDocuments({formateurid: req.params.formateurid }, function (err, count) {
        res.json(count);
      });
});
//get one formateur
router.get('/oneformateur/:id', function(req, res, next) {
    Formateur.findOne({_id: req.params.id},function(err, formateurs){
        res.json(formateurs);
    });
});
//get one participant
router.get('/oneparticipant/:id', function(req, res, next) {
    Participant.findOne({_id: req.params.id},function(err, participants){
        res.json(participants);
    });
});
//ajouter session
router.post('/session', (req, res, next)=>{
   // res.send('Ajouter une session');
    //create new session from request
    const newSession = new Session(
    {name: req.body.name,
    track:req.body.track,
    date:req.body.date,
    duree: req.body.duree,
    adress: req.body.adress,
    participants: req.body.participants,
    formateurid: req.body.formateurid,
    isCompleted: false
    });
console.log(newSession);
    //insert into database
    newSession.save((err)=>{
        if (err)
        {
            res.json({msg: 'Failed to add session'});
        }
        else {
            res.json({msg: 'Session added successfully'});
        }
    });
});

//ajouter formateur
router.post('/formateur', (req, res, next)=>{
     const newFormateur = new Formateur(
     {identity: req.body.identity,
     firstname: req.body.firstname,
     lastname: req.body.lastname,
     datebirth:req.body.datebirth,
     email:req.body.email,
     phone: req.body.phone,
     address: req.body.address,
     speciality: req.body.speciality
     });
 console.log(newFormateur);
     //insert into database
     newFormateur.save((err)=>{
         if (err)
         {
             res.json({msg: 'Failed to add formateur'});
         }
         else {
             res.json({msg: 'Formateur added successfully'});
         }
     });
 });

 router.post('/user', (req, res, next)=>{
    const newUser = new User(
    {username: req.body.username,
    password: req.body.password
    });
console.log(newUser);
    //insert into database
    newUser.save((err)=>{
        if (err)
        {
            res.json({msg: 'Failed to add user'});
        }
        else {
            res.json({msg: 'user added successfully'});
        }
    });
});



 //ajouter participant
router.post('/participant', (req, res, next)=>{
    const newParticipant = new Participant(
    {firstname: req.body.firstname,
    lastname: req.body.lastname,
    datebirth:req.body.datebirth,
    email:req.body.email,
    track: req.body.track,
    session: req.body.session
    });
console.log(newParticipant);
    //insert into database
    newParticipant.save((err)=>{
        if (err)
        {
            res.json({msg: 'Failed to add participant'});
        }
        else {
            res.json({msg: 'Participant added successfully'});
        }
    });
});

//supprimer session
router.delete('/session/:id', (req, res, next)=>{
    Session.remove({_id: req.params.id}, function(err, result){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});

//supprimer formateur
router.delete('/formateur/:id', (req, res, next)=>{
    Formateur.remove({_id: req.params.id}, function(err, result){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});

//supprimer participant
router.delete('/participant/:id', (req, res, next)=>{
    Participant.remove({_id: req.params.id}, function(err, result){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});
//modifier une session
router.put('/update/:id', (req, res) => {
    Session.update({_id: req.params.id}, {
            $set: {
                name: req.body.name,
                track: req.body.track,
                date: req.body.date,
                duree: req.body.duree,
                adress: req.body.adress,
                participants: req.body.participants,
                formateurid: req.body.formateurid,
                isCompleted: req.body.isCompleted,
            }
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        });
});
//modifier un formateur
router.put('/updateformateur/:id', (req, res) => {
    Formateur.update({_id: req.params.id}, {
            $set: {
                identity: req.body.identity,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                datebirth:req.body.datebirth,
                email:req.body.email,
                phone: req.body.phone,
                address: req.body.address,
                speciality: req.body.speciality
            }
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        });
});

//modifier un participant
router.put('/updateparticipant/:id', (req, res) => {
    Participant.update({_id: req.params.id}, {
            $set: {
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                datebirth:req.body.datebirth,
                email:req.body.email,
                track: req.body.track,
                session: req.body.sessions
            }
        },
        (err, result) => {
            if (err) return res.send(err)
            res.send(result)
        });
});
// verifier si un formateur existe ou non
router.get('/formateurexiste/:idformateur',function(req,res,next){
    Formateur.countDocuments({identity: req.params.idformateur }, function (err, count) {
        res.json(count);
      });
});
router.get('/userlogin/:username/:password',function(req,res,next){
    User.countDocuments({username: req.params.username,password: req.params.password }, function (err, count) {
        res.json(count);
      });
});



module.exports = router;

