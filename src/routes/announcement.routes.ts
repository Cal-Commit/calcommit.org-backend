import express, { Router } from 'express'

const router: Router = express.Router()

import { AnnouncementsController } from '../controllers/announcements.controllers'

router.post('/post-announcement', AnnouncementsController.postAnnouncement)

router.get('/get-announcements', AnnouncementsController.getAnnouncements)

export default router
