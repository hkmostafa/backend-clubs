var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
const { Op } = require("sequelize");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { sequelize, Club } = require("../models/index");
const { token } = require("morgan");
const multer = require("multer");


var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./posters");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

var upload = multer({ storage: storage });

router.post('/create', upload.single("evPoster"), async(req, res) => {
    try {
        const addEvent = await DB.Evenement.create({
            evTitle: req.body.evTitle,
            evDescription: req.body.evDescription,
            evPoster: req.file.path,
            evDate: req.body.evDate,
            evTime: req.body.evTime,
            ClubId: req.body.ClubId
        });
        res.send(addEvent);
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})

router.post('/list', async(req, res) => {
    try {
        var { filter = {} } = req.body;
        var club = filter.ClubId || null;
        console.log("***** Club Id  : ", club)
        const events = await DB.Evenement.findAll({

            where: {

                ClubId: club ? {
                    [Op.eq]: club
                } : {
                    [Op.not]: null
                },


            },
            include: [
                { model: DB.Club, required: true },
            ]

        });
        console.log("******************************************************" + events)
        res.send(events);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})

router.post('/listone/:id', async(req, res) => {
    try {


        const event = await DB.Evenement.findAll({

            where: {
                id: req.params.id,


            },
            include: [

                { model: DB.Club, required: true },

            ]
        });
        res.send(event);
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
})




router.post('/delete/', async(req, res) => {
    try {
        console.log("Deleting event...")
        DB.Evenement.destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(() => {
                res.status(200).json({ message: 'Event Deleted succesfuly' });
            })
    } catch (err) {
        res.status(400).send(err);
    }
})


router.post('/update', async(req, res) => {
    try {
        const event = await DB.Evenement.findOne({
            where: {
                id: req.body.id
            }
        });
        res.send(event);
        event.name = req.body.evTitle;
        event.last_name = req.body.evDescription;
        event.email = req.body.evDate;
        await event.save()

    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})

module.exports = router;