import express from 'express'
import { getAllmessages, sendMessage } from '../Controllers/messageController.js'
import { isAdminAuthenticated } from '../Middlewares/auth.js'

const router = express.Router()

router.post("/sendMessage", sendMessage)
router.get("/getAllMessages", isAdminAuthenticated, getAllmessages)

export default router