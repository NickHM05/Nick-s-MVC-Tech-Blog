const authorHere = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (req.session.loggedIn) {
        console.log('loggedIn')
        next();
    } else {
        res.redirect('/login');
    }
  };
  
  module.exports = authorHere;
  