const argon2 = require("argon2");
const { randomBytes } = require("crypto");
const DB = require("../models/index");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const { use } = require("../routes");
const nodemailer = require('nodemailer');

var transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: "este.parauni@gmail.com",
        pass: "Para12345"
    }
})

module.exports = class AuthService {
    constructor() {}

    async Login(email, password) {
        const userRecord = await DB.User.findOne({
            where: { email: {
                    [Op.eq]: email } },
            include: [
                { model: DB.respClub, required: false }
            ]
        });
        console.log("*************", userRecord)
        if (!userRecord) {
            throw new Error("User not found");
        } else {
            console.log(userRecord)
                /*console.log(password)*/
            const correctPassword = await argon2.verify(
                userRecord.password,
                password
            );
            if (!correctPassword) {
                throw new Error("Incorrect password");
            }
        }
        console.log("*******************************************************************")
        const club_id = userRecord.respClub ? userRecord.respClub.ClubId : null
        const token = this.generateJWT({ id: userRecord.id, name: userRecord.name, email: userRecord.email, club_id });
        return {
            user: {
                email: userRecord.email,
                name: userRecord.name,
            },
            token
        };
    }


    async register(email, password, name, last_name, phone, club_id = null) {
        const salt = randomBytes(32);
        const passwordHashed = await argon2.hash(password, { salt });
        const userRecord = await DB.User.create({
            password: passwordHashed,
            email,
            salt: salt.toString("hex"),
            name,
            phone,
            last_name,
            role: club_id ? "resp" : "admin"
        });
        if (club_id) {
            DB.respClub.create({
                ClubId: club_id,
                UserId: userRecord.id
            })
        }
        const token = this.generateJWT({ id: userRecord.id, name: userRecord.name, email: userRecord.email, club_id });
        return {
            user: {
                id: userRecord.id,
                email: userRecord.email,
                name: userRecord.name,
            },
            token,
        };
    }

    generateJWT(user) {
        //console.log(user)
        return jwt.sign({
                data: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    club_id: user.club_id || null
                },
            },
            "MySuP3R_z3kr3t.", { expiresIn: "365d" }
        );
    }
    sendmail(message) {
        transport.sendMail(message, (err, info) => {
            if (err) {
                console.log(err);
            } else {
                console.log(info)
            }
        })
    }
};