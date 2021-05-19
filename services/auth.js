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