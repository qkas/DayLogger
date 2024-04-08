import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const title = 'Registration page'

export const registerView = (req, res) => {
    res.render("register", {
        title
    });
}

export const registerUser = (req, res) => {
    const { username, email, password, confirm } = req.body;
    if (!username || !email || !password || !confirm) {
        console.log("Fill empty fields");
    }
    //Confirm Passwords
    if (password !== confirm) {
        console.log("Password must match");
    } else {
        //Validation
        User.findOne({ email: email }).then((user) => {
            if (user) {
                console.log("email exists");
                res.render("register", {
                    title,
                    username,
                    email,
                    password,
                    confirm,
                });
            } else {
                //Validation
                const newUser = new User({
                    username,
                    email,
                    password,
                });
                //Password Hashing
                bcrypt.genSalt(10, (err, salt) =>
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err) throw err;
                        newUser.password = hash;
                        newUser
                            .save()
                            .then(res.redirect("/login"))
                            .catch((err) => console.log(err));
                    })
                );
            }
        });
    }
};