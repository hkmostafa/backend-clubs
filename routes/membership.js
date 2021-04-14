var express = require("express");
var router = express.Router();
var db = require("../models/index");


router.post('/apply', async(req, res) => {
    try {

        const applyClub = await db.Membership.create({
            name: req.body.name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            faculty: req.body.faculty,
            level: req.body.level,
            cause: req.body.cause,
            ClubId: req.body.ClubId
        });
        console.log(applyClub);
        res.send(applyClub);
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})

router.get('/list', async(req, res) => {
    try {
        var { filter = {}, offset = 0, limit = 20 } = req.body;

        console.log("***** Club Id  : ", club)
        const memberships = await DB.Membership.findAll({
            offset,
            limit,
            where: {

            },

            include: [

                { model: DB.Club, required: true },

            ]

        });
        res.send(memberships);
    } catch (e) {
        console.log(e);
        return res.json(e).status(500).end();
    }
})
module.exports = router;