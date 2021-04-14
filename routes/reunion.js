var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
const {Op}= require("sequelize");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { sequelize, Club } = require("../models/index");
const moment =require("moment");
const AuthService = require("../services/auth");





router.post('/create',isAuth,attachCurrentUser,checkRole("resp"),async (req,res)=>{
  try {
    
        const annocerReun =await DB.Reunion.create({
        title:req.body.title,
        meet_date: req.body.meet_date
          }); 
          
    const authServiceInstance = new AuthService();
    console.log(req.token.data)
    const members =await DB.Membre.findAll({where: {ClubId:{[Op.eq]:req.token.data.club_id}}});
    console.log(members)
    var emails = members.map(item=>item.email);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
    console.log(emails);
    authServiceInstance.sendmail({
      from: "este.parauni@gmail.com" ,
      subject: "Hello",
      text: `hello dear member we want to inform you that our next meeting is on ${req.body.meet_date} we will talk about ${req.body.title}`,
      to: emails

    });
      res.send(annocerReun);
  }catch (e) {
    console.log(e);
      return res.json(e).status(500).end();
  }




})

  module.exports = router;





