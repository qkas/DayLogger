export const protectRoute = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    console.log('Route protected, login required.');
    res.redirect('/login');
}