import controllers from './room.controllers'
import { Router } from 'express'

const router = Router()

// /api/room
router.route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)


// /api/room/:id
router.route('/:id')
      .get(controllers.getOneItem)
      .put(controllers.updateItem)
      .delete(controllers.removeItem)



export default router
