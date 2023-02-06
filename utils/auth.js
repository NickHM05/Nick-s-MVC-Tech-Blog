const authorHere = (req, res, next) => {
    // If the user is not logged in, redirect the request to the login route
    if (!req.session.logged_in) {
        console.log('logged in')
        next();
    } else {
        res.redirect('/login');
    }
  };
  
  module.exports = authorHere;
  