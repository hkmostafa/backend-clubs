var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
const {Op}= require("sequelize");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { sequelize, Club } = require("../models/index");

///////////************not finished should add checkrole */   
router.get('/list',isAuth,attachCurrentUser,async (req,res)=>{
  try{
    var  {filter={},offset=0,limit=10}=req.body;
    console.log("beggining")
    const responsable = await DB.User.findAll({offset,limit,where:{
        name:filter.name ? {[Op.like]:`${filter.name}%`}:{[Op.like]:`%`},
        last_name:filter.last_name ? {[Op.like]:`${filter.last_name}%`}:{[Op.like]:`%`},
        phone:filter.phone ? {[Op.like]:`${filter.phone}%`}:{[Op.like]:`%`},
        //ClubId:filter.ClubId ? {[Op.eq]:filter.ClubId}:{[Op.eq]:null},
        }
          }); 
          console.log("end")
    res.send(responsable);
  }
  catch(err){
    console.log(err)
    res.status(400).send(err);
  }
})
module.exports = router;





