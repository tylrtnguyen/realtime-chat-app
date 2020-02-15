import controllers from './user.controllers'
import { Router } from 'express'

const router = Router()

// api/user/
router.route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)

// api/user/:id
router.route(':id')
      .get(controllers.getOneItem)
      .put(controllers.updateItem)
      .delete(controllers.removeItem)

export default router