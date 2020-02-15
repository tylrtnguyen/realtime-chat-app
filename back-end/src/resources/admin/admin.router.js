import controllers from './admin.controllers'
import express from 'express'

const router = express.Router()

// api/admin
router.route('/')
      .get(controllers.getAllItems)
      .post(controllers.addItem)

// api/admin/:id
router.route('/:id')
      .get(controllers.getOneItem)
      .put(controllers.updateItem)
      .delete(controllers.removeItem)

export default router