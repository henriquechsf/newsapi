import * as HttpStatus from 'http-status'
import NewsService from '../services/NewsService'

class NewsController {
    // metodo generico de resposta
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

    update(req, res) {
        const _id = req.params.id
        let vm = req.body

        NewsService.update(_id, vm)
            .then(news => this.sendResponse(res, HttpStatus.CREATED, ` ${news.title} foi atualizada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`))
    }

    delete(req, res) {
        const _id = req.params.id

        NewsService.delete(_id)
            .then(() => this.sendResponse(HttpStatus.OK), "Notícia deletada com sucesso!")
            .catch(error => console.error.bind(console, `Error ${error}`))
    }
}

export default new NewsController()