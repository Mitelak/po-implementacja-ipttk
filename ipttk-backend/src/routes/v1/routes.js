import express from 'express'
import { routes } from '../../controllers/v1'
import { catchAsync } from '../../middlewares/errors'
import passport from '../../middlewares/passport'
import roles from '../../middlewares/roles'
const router = express.Router()
const authorization = passport.authenticate('jwt', {session: false})

//GET /routes/verify
router.get('/verify', authorization, roles([1]), catchAsync(routes.verify.getAll))

//GET /routes/verify/:id
router.get('/verify/:id', authorization, roles([1]), catchAsync(routes.verify.get))

//PATCH /routes/verify/accept
router.patch('/verify/accept', authorization, roles([1]), catchAsync(routes.verify.accept))

//GET /routes - uzytkowniku lub jego typie (jezeli przodownik)
router.get('/', authorization, catchAsync(routes.getAll))

//GET /routes/:id
router.get('/:id', authorization, catchAsync(routes.get))

//POST /routes
router.post('/', authorization, catchAsync(routes.create))

export default router;

