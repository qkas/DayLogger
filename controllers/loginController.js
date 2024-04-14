import passport from 'passport';

export const loginView = (req, res) => {
    res.render('login', {
        user: req.user,
        protect: req.flash('protect'),
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
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })(req, res);
    }
};

export const logoutUser = (req, res) => {
    req.session.destroy();
    return res.redirect('/login');
};