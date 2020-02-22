import controllers from './room.controllers'
import { Router } from 'express'

const router = Router()

// api/event
router.route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)


// api/event/:id
router.route('/:id')
      .get(controllers.getOneItem)
      .put(controllers.updateItem)
      .delete(controllers.removeItem)

export default router
