import passport from 'passport';

const title =  'Login';

// For View 
export const loginView = (req, res) => {
    res.render('login', {
        title,
        messages: req.flash('failure'),
        email: req.cookies.email
    });
}

export const loginUser = (req, res) => {
    const { email, password } = req.body;
    res.cookie('email', email);
    //Required
    if (!email || !password) {
        req.flash('failure', 'Please fill in all the fields.');
        return res.redirect('/login');
    } else {
        passport.authenticate('local', {
            successRedirect: '/dashboard',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res);
    }
};