import express from 'express'
import { segments } from '../../controllers/v1'
import { catchAsync } from '../../middlewares/errors'
import passport from '../../middlewares/passport'
import roles from '../../middlewares/roles'
const router = express.Router()
const authorization = passport.authenticate('jwt', {session: false})

//POST /segments
router.post('/', authorization, roles([2]), catchAsync(segments.create))

//GET /segments?startPoint
router.get('/', authorization, catchAsync(segments.get))

//GET /segments/:id?date=
router.get('/:id', authorization, catchAsync(segments.getById))

export default router;

