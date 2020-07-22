/**
 * Arquivo onde será criado as queries no banco
 */

import NewsRepository from '../repositories/NewsRepository'

class NewsService {
    get() {
        return NewsRepository.find({})
    }

    getById(_id) {
        return NewsRepository.findById(_id)
    }
}

export default new NewsService()