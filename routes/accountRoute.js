import {Router} from 'express'

import {
    getAccount
} from '../controller/accountController.js'

const router = Router()

router.get('/api/cuenta/:cuenta', getAccount)

export default router