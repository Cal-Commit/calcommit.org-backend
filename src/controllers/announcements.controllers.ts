import { Request, Response } from 'express'
import { validationResult } from 'express-validator'

import Announcement from '../models/announcement.model'

export class AnnouncementsController {
    public static async postAnnouncement(req: Request, res: Response) {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array()[0] })
        }

        const { title, description, notionRef } = req.body

        const nonFormatDate = new Date()
        const yr = nonFormatDate.getFullYear()
        let mo = nonFormatDate.getMonth() + 1
        let da = nonFormatDate.getDate()

        if (da < 10) da = parseInt('0' + da) + da
        if (mo < 10) mo = parseInt('0' + mo) + mo

        const date = `${mo}/${da}/${yr}`

        const newAnnouncement = new Announcement({
            title,
            description,
            date,
            notionRef,
        })

        await newAnnouncement.save()

        return res.status(201).json(newAnnouncement)
    }

    public static async getAnnouncements(req: Request, res: Response) {
        const { id } = req.query

        const announcement = await Announcement.findById(id)
        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' })
        }

        return res.status(200).json(announcement)
    }
}
