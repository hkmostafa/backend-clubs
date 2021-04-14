var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
const {Op}= require("sequelize");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { sequelize, Club } = require("../models/index");
const { token } = require("morgan");

    
router.get('/list',isAuth, attachCurrentUser,async (req,res)=>{
  try{
    var  currentUser = req.currentUser
    var  {filter={},offset=0,limit=10}=req.body;
    var club=req.token.data.club_id ?req.token.data.club_id:(filter.ClubId||null)  ;
    const membre = await DB.Membre.findAll({offset,limit,where:{
          name:filter.name ? {[Op.like]:`${filter.name}%`}:{[Op.like]:`%`},
          last_name:filter.last_name ? {[Op.like]:`${filter.last_name}%`}:{[Op.like]:`%`},
          phone:filter.phone ? {[Op.like]:`${filter.phone}%`}:{[Op.like]:`%`},
          ClubId:club?{[Op.eq]:club}:(filter.ClubId ? {[Op.eq]:filter.ClubId}:{[Op.eq]:null}),
          }
          });
    res.send(membre);
  }
  catch(err){
    console.log(err)
    res.status(400).send(err);
  }
})



router.post('/add',isAuth,attachCurrentUser,checkRole("resp"),async (req,res)=>{
  try {
    console.log("*************************",res.token)
    const ClubId = req.token.data.club_id
    const { name,last_name, email, phone} = req.body;
    const addMmbr =await DB.Membre.create({
          name: req.body.name,
          last_name: req.body.last_name,
          email: req.body.email,
          phone: req.body.phone,
          ClubId: ClubId
          });
    res.send(addMmbr); 
  }catch (e) {
    console.log(e);
      return res.json(e).status(500).end();
  }
})


router.delete('/delete/:_id',async (req,res)=>{
  try{
    console.log("Deleting...")
    DB.Membre.destroy({
    where: {
    id:req.params._id
    }})
  .then(()=>{
    res.status(200).json({message:'Deleted'});
  })
  }catch(err){
    res.status(400).send(err);}
  })


router.put('/update/:_id',async (req,res)=>{
  try {
  const membre = await DB.Membre.findOne({
        where: {
        id:req.params._id
        }});  
        membre.name= req.body.name;
        membre.last_name= req.body.last_name;
        membre.email= req.body.email;
        membre.phone= req.body.phone;    
      await membre.save()
  res.send(membre); 
  }catch(e) {
    console.log(e);
    return res.json(e).status(500).end();
    }
})

  module.exports = router;





