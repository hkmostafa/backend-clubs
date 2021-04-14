var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
const { Op } = require("sequelize");
const checkRole = require("../middlewares/checkRole");
const isAuth = require("../middlewares/isAuth");
const attachCurrentUser = require("../middlewares/attachCurrentUser");
const { sequelize, Club } = require("../models/index");
const multer = require("multer");

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "./logos");
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

var upload = multer({ storage: storage });



router.post('/create', upload.single("logo"), async(req, res) => {
    try {
        const { club_name, logo, description, responsablePeda, responsableClub, email, facebook, instagram } = req.body;
        const addClub = await DB.Club.create({
            club_name: req.body.club_name,
            logo: req.file.path,
            color: req.body.color,
            description: req.body.description,
            responsablePeda: req.body.responsablePeda,
            responsableClub: req.body.responsableClub,
            email: req.body.email,
            facebook: req.body.facebook,
            instagram: req.body.instagram,

        });
        res.send(addClub);
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})

router.get('/list', async(req, res) => {
    try {
        var { filter = {}, offset = 0, limit = 20 } = req.body;
        var club = filter.id || null;
        const clubs = await DB.Club.findAll({
            offset,
            limit,
            where: {

            },

            include: [

                { model: DB.Slideshow, required: false },

            ]

        });
        res.send(clubs);
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})



router.get('/listone/:id', async(req, res) => {
    try {

        const club = await DB.Club.findAll({
            where: {
                id: req.params.id,
                // offset,
                // limit,
                // where: filter.id ? {
                //     [Op.eq]: filter.id
                // } : {
                //     [Op.eq]: null
                // },


            },
            include: [

                { model: DB.Slideshow, required: false }
            ]
        });
        res.send(club);

    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})

router.delete('/delete/:_id', async(req, res) => {
    try {
        console.log("Deleting...")
        DB.Club.destroy({
                where: {
                    id: req.params._id
                }
            })
            .then(() => {
                res.status(200).json({ message: 'Deleted' });
            })
    } catch (err) {
        res.status(400).send(err);
    }
})

module.exports = router;