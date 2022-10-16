import express, { Router } from 'express'
import { body } from 'express-validator'

const router: Router = express.Router()

import { AnnouncementsController } from '../controllers/announcements.controllers'

router.post(
    '/post-announcement',
    [
        body('title').notEmpty().withMessage('Title is empty').isString(),
        body('description')
            .notEmpty()
            .withMessage('Description is empty')
            .isString(),
        body('notionRef')
            .notEmpty()
            .withMessage('NotionRef is empty')
            .isString(),
    ],
    AnnouncementsController.postAnnouncement
)

router.get('/get-announcements', AnnouncementsController.getAnnouncements)

export default router
