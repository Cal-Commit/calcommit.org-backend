import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import axios from 'axios'

import Announcement from '../models/announcement.model'

export class AnnouncementsController {
    private static async getNotionPageId(notionPageUrl: string) {
        return notionPageUrl.split('/')[3].split('-').slice(-1)[0]
    }

    public static async postAnnouncement(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0] })
        }

        const { title, description, notionUrl } = req.body

        const nonFormatDate = new Date()
        const yr = nonFormatDate.getFullYear()
        let mo = nonFormatDate.getMonth() + 1
        let da = nonFormatDate.getDate()

        const date = `${mo}/${da}/${yr}`

        const notionPageId = await AnnouncementsController.getNotionPageId(
            notionUrl
        )

        const newAnnouncement = new Announcement({
            title,
            description,
            date,
            notionRef: notionPageId,
        })

        await newAnnouncement.save()

        return res.status(201).json({
            announcement: newAnnouncement,
        })
    }

    public static async getAnnouncements(req: Request, res: Response) {
        const { id } = req.query

        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0] })
        }

        const announcement = await Announcement.findById(id)
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' })
        }

        const response = await axios.get("https://notion-api.splitbee.io/v1/page/" + announcement.notionRef)

        const announcementToSend = {
            ...announcement._doc,
            blockMap: response.data
        }

        return res.status(200).json({
            announcement: announcementToSend,
        })
    }
}
