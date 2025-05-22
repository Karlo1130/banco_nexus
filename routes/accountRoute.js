import {Router} from 'express'

import {
    getAccount,
    postTransaction
} from '../controller/accountController.js'

const router = Router()

router.get('/api/cuenta/:cuenta', getAccount)
router.post('/api/transaction/:cuenta', postTransaction)

export default router