import express, { Router } from 'express'
import { body, query } from 'express-validator'

const router: Router = express.Router()

import { AnnouncementsController } from '../controllers/announcements.controllers'

router.post(
    '/post-announcement',
    [
        body('title')
            .notEmpty()
            .withMessage('Title is empty')
            .isString()
            .trim(),
        body('description')
            .notEmpty()
            .withMessage('Description is empty')
            .isString()
            .trim(),
        body('notionUrl')
            .notEmpty()
            .withMessage('NotionRef is empty')
            .isURL()
            .withMessage('NotionRef is not a valid URL')
            .trim(),
    ],
    AnnouncementsController.postAnnouncement
)

router.get(
    '/get-announcement',
    [query('id').notEmpty().withMessage('ID is required').isString().trim()],
    AnnouncementsController.getAnnouncements
)

export default router
// cd9aba3c18ac44ada10bc9df2f728595