import { UserModel } from '../../models'
import passport from '../../middlewares/passport'
import jwt from 'jsonwebtoken'
import keys from '../../config/keys'
import bcrypt from 'bcryptjs'

export default {
    login: async (req, res, next) => {
        if(!req.body.email)
            return res.status(400).send({message: "Email jest wymagany."})
        if(!req.body.password)
            return res.status(400).send({message: "Hasło jest wymagane."})

        passport.authenticate('local', { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).json({
                    message: info.message || 'Coś poszło nie tak!',
                    err
                });
            } else if (!user) {
                return res.status(404).json({
                    message: info.message || 'Nie można znaleźć użytkownika.',
                    err
                })
            } else {
                req.login(user, { session: false }, (err) => {
                    if (err)
                        return res.status(500).send(err);

                    const token = jwt.sign({
                        iss: 'CodeWork',
                        sub: user.email,
                        user: {email: user.email, type: user.type},
                        iat: new Date().getTime(),
                        exp: new Date().setDate(new Date().getDate() + 1)

                    }, keys.passport)
                    const { password, pesel, ...userData } = user._doc
                    return res.status(200).json({token, ...userData})
                })
            }
        })(req, res)
    },
    register: async (req, res) => {
        await bcrypt.hash(req.body.password, 10)
        .then( hash => {
            UserModel.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                pesel: req.body.pesel,
                password: hash,
                type: req.body.type,
                mountainGroup: req.body.mountainGroup,
                image: req.body.image
            })
            .then(result => {
                delete result.password
                res.status(201).send(result)
            })
            .catch(err => {
                res.status(500).send({message: "Wystąpił błąd z tworzeniem konta użytkownika ", err})
            })
        })
        .catch(() => {
            res.status(500).send({message: "Wystąpił błąd z szyfrowaniem hasła. ", err})
        })
    },
    get: async (req, res) => {
        UserModel.findOne({email: req.user.email})
        .then(async user => {
            delete user.pesel
            return res.status(200).send(user)
        })
        .catch(err => {
            return res.status(500).send({message: "Błąd wewnętrzny. Kod błędu: 500", err})
        })
    }
}