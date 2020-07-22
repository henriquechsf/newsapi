import * as HttpStatus from 'http-status'
import NewsService from '../services/NewsService'

class NewsController {
    // metodo generico
    sendResponse = (res, statusCode, data) => {
        res.status(statusCode).json({ result: data })
    }

    get(req, res) {
        NewsService.get()
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    getById(req, res) {
        const _id = req.params.id

        NewsService.getById(_id)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    create(req, res) {
        let vm = req.body

        NewsService.create(vm)
            .then(news => this.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    update(req, res) { }

    delete(req, res) { }
}

export default new NewsController()