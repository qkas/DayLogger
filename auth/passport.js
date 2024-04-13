import bcrypt from 'bcryptjs';
import LocalStrategy from 'passport-local';
import { User } from '../models/User.js';

export const loginCheck = passport => {
    passport.use(
        new LocalStrategy({ usernameField: 'email', passReqToCallback: true }, (req, email, password, done) => {
            //Check user
            User.findOne({ email: email })
                .then((user) => {
                    if (!user) {
                        req.flash('failure', 'Incorrect email or password');
                        return done(null, false);
                    }
                    //Match Password
                    bcrypt.compare(password, user.password, (error, isMatch) => {
                        if (error) throw error;
                        if (isMatch) {
                            return done(null, user);
                        } else {
                            req.flash('failure', 'Incorrect email or password');
                            return done(null, false);
                        }
                    });
                })
                .catch((error) => {
                    console.log(error);
                    return done(error);
                });
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .then(user => {
                done(null, user);
            })
            .catch(error => {
                done(error, null);
            });
    });
};
