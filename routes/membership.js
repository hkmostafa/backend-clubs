var express = require("express");
var router = express.Router();
var db = require("../models/index");
const AuthService = require("../services/auth");

router.post('/apply', async(req, res) => {
    try {

        const applyClub = await db.Membership.create({
            name: req.body.name,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone,
            faculty: req.body.faculty,
            level: req.body.level,
            cause: req.body.cause,
            ClubId: req.body.ClubId,

        });

        const respmail = await db.respClub.findOne({
            where: {
                ClubId: req.body.ClubId
            },
            include: [
                { model: db.User, required: false },
                { model: db.Club, required: false }
            ]
        })
        const authServiceInstance = new AuthService();
        authServiceInstance.sendmail({
            from: "este.parauni@gmail.com",
            subject: `Candidature de ${req.body.name} ${req.body.last_name}`,
            text: `${req.body.name} ${req.body.last_name} a rempli le formulaire pour joindre le ${respmail.Club.club_name}! `,
            to: respmail.User.email
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
                { model: db.User, required: false },
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