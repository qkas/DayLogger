export const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Route protected, redirecting.');
    req.flash('protect', 'You must be logged in to access this page');
    res.redirect('/login');
}