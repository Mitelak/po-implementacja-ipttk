import express from 'express'
import { user } from '../../controllers/v1'
import { catchAsync } from '../../middlewares/errors'
import passport from '../../middlewares/passport'
const router = express.Router()
const authorization = passport.authenticate('jwt', {session: false})

//GET /user - po tokenie 
router.get('/', authorization, catchAsync(user.get))

//POST /user/login
router.post('/login', catchAsync(user.login))

//POST /user/register
router.post('/register', catchAsync(user.register))

export default router;
