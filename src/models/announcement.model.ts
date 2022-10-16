import mongoose, { ObjectId } from 'mongoose'

export interface AnnouncementStructure {
    _doc: {
        _id: ObjectId
        title: string
        description: string
        date: string
        notionRef: string
    }
    _id?: ObjectId | string
    title: string
    description: string
    date: string
    notionRef: string
}

const announcementSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    notionRef: {
        type: String,
        required: true,
    },
})

export default mongoose.model<AnnouncementStructure>(
    'announcement',
    announcementSchema
)
