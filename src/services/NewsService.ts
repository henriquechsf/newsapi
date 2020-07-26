/**
 * Arquivo onde será criado as queries no banco
 */

import NewsRepository from '../repositories/NewsRepository'

class NewsService {
    async get() {
        return await NewsRepository.find({})
    }

    async getById(_id) {
        return await NewsRepository.findById(_id)
    }

    async create(news) {
        return await NewsRepository.create(news)
    }

    async update(_id, news) {
        return await NewsRepository.findByIdAndUpdate(_id, news)
    }

    async delete(_id) {
        return await NewsRepository.findByIdAndRemove(_id)
    }
}

export default new NewsService()