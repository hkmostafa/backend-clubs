const DB = require("../models/index");

module.exports=async (req, res, next) => {
  try {
    console.log(req.token)
    const decodedUser = req.token.data;
    console.log("************************",decodedUser.id)
    const user = await DB.User.findOne({where: { id: decodedUser.id }});
    console.log("/////////////////////////////////",user)
    if (!user) {
      res.status(401).end();
    }
    req.currentUser = user;
    return next();
  } catch(e) {
    console.log(e)
    return res.json(e).status(500);
  }
}