import express from 'express'
import { points } from '../../controllers/v1'
import { catchAsync } from '../../middlewares/errors'
import passport from '../../middlewares/passport'
import roles from '../../middlewares/roles'
const router = express.Router()
const authorization = passport.authenticate('jwt', {session: false})

//POST /points
router.post('/', authorization, roles([2]), catchAsync(points.create))

//GET /points/:id
router.get('/:id', catchAsync(points.get))

//GET /points/?name=?date=
router.get('/', catchAsync(points.getAll))

export default router;

