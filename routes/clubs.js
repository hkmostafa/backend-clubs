var express = require("express");
const router = require('express').Router();
const DB = require("../models/index");
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
        const addClub = await DB.Club.create({
            club_name: req.body.club_name,
            logo: req.file.path.replace("\\", "/"),
            color: req.body.color,
            description: req.body.description,
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
        var { offset = 0, limit = 20 } = req.body;

        const clubs = await DB.Club.findAll({
            offset,
            limit
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
            },

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