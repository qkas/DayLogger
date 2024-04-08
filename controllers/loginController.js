import passport from 'passport';

const title =  "Login page";

// For View 
export const loginView = (req, res) => {
    res.render("login", {
        title,
    });
}

export const loginUser = (req, res) => {
    const { email, password } = req.body;
    //Required
    if (!email || !password) {
        console.log("Please fill in all the fields");
        res.render("login", {
            title,
            email,
            password,
        });
    } else {
        passport.authenticate("local", {
            successRedirect: "/dashboard",
            failureRedirect: "/login",
            failureFlash: true,
        })(req, res);
    }
};