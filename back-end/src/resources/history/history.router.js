import controllers from './history.controllers'
import { Router } from 'express'

const router = Router()

router.route('/')
      .get(controllers.getAllItems)

router.route('/:roomname')
      .get(controllers.getChatByRoom)

export default router