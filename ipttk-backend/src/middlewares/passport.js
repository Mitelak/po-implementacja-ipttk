import passport from 'passport'
import bcrypt from 'bcryptjs'
import passportLocal from 'passport-local'
import { UserModel } from '../models'
import passportJWT from "passport-jwt";
import keys from '../config/keys'
const LocalStrategy = passportLocal.Strategy
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, (email, password, callback) => {
    UserModel.findOne({email})
    .then(user => {
        if(!user)
            callback(null, false, { message: "Użytkownik nie został znaleziony.", status: 404})
        else {
            bcrypt.compare(password, user.password)
            .then(res => {
                res ? callback(null, user, { message: 'Zalogowano poprawnie.', status: 200}) : callback(null, false, { message: "Błędne hasło.", status: 400})
            })
            .catch(err => {
                callback(null, false, { message: "Wystąpił błąd z porównaniem haseł.", status: 500}, err)
            })
        }
    })
    .catch(err => {
        callback(null, false, { message: "Internal error", status: 500, err})
    })
}))

passport.use(new JWTStrategy({
    jwtFromRequest: ExtractJWT.fromHeader('authorization'),
    secretOrKey: keys.passport
}, (jwtPayload, cb) => {
    UserModel.findOne({ email: jwtPayload.user.email }, (err, user) => {
        return err ? cb(err) : cb(null, user);
    })}
));

module.exports = passport