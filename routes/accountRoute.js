import {Router} from 'express'

import {
    getTransactions
} from '../controller/accountController.js'

const router = Router()

router.get('/api/cuenta/:cuenta', getTransactions)

export default router