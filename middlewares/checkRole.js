module.exports = (requiredRole) => {
    return (req, res, next) => {
      console.log('Required role?')
      console.log(req.currentUser)
      if(req.currentUser.role !== requiredRole) {
        return res.status(401).end();
      } else {
        console.log('User meet required role, going to next middleware')
        return next();
      }
    }
  }