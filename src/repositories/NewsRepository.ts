import * as mongoose from 'mongoose'
import NewsSchema from '../models/NewsSchema'

export default mongoose.model('news', NewsSchema)