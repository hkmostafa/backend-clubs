var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var authRouter = require("./routes/auth");
var mmbRouter = require("./routes/members");
var respRouter = require("./routes/responsables");
var clubRouter = require("./routes/clubs");
var reunionRouter = require("./routes/reunion");
var db = require(__dirname + "/models/index");
var eventRouter = require('./routes/events');
var membershipRouter = require('./routes/membership');

// Sync the database models
db.sequelize.sync({
    //force: true
});

var app = express();


app.get("/logos/:name", function(req, res) {
    console.log(path.join(__dirname + `/logos/${req.params.name}`));
    res.sendFile(path.join(__dirname + `/logos/${req.params.name}`));
});

app.get("/posters/:name", function(req, res) {
    console.log(path.join(__dirname + `/posters/${req.params.name}`));
    res.sendFile(path.join(__dirname + `/posters/${req.params.name}`));
});
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/members", mmbRouter);
app.use("/auth", authRouter);
app.use("/responsables", respRouter);
app.use("/clubs", clubRouter);
app.use("/reunion", reunionRouter);
app.use("/events", eventRouter);
app.use('/membership', membershipRouter);


// catch 404 and forward to error handler

app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
console.log("hiiiiiiiiiiii")

module.exports = app;