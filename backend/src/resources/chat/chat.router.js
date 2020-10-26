import controllers from './chat.controllers'
import { Router } from 'express'

const router = Router()

// /api/roomhistory/:roomname
router.route('/:roomname')
      .get(controllers.getChatByRoom)

// /api/chat
router.route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)

// /api/chat/:id
router.route('/:id')
      .get(controllers.getOneItem)
      .put(controllers.updateItem)
      .delete(controllers.removeItem)


     




export default router