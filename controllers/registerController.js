import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';

const title = 'Registration page';

export const registerView = (req, res) => {
    res.render('register', {
        title,
        messages: req.flash('failure')
    });
}

export const registerUser = (req, res) => {
    const { username, email, password, confirm } = req.body;
    if (!username || !email || !password || !confirm) {
        req.flash('failure', 'Please fill in all the fields.');
        return res.redirect('/register');
    }
    if (password !== confirm) {
        req.flash('failure', 'Passwords must match.');
        return res.redirect('/register');
    }

    User.findOne({ email: email }).then((user) => {
        if (user) {
            req.flash('failure', 'Email already in use.');
            return res.redirect('/register');
        } 

        const newUser = new User({
            username,
            email,
            password,
        });
        bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err;
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                
                newUser.password = hash;
                newUser.save()
                    .then(() => res.redirect('/login'))
                    .catch((err) => console.log(err));
            });
        });
    });
};
