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

    getById(req, res) { }

    create(req, res) { }

    update(req, res) { }

    delete(req, res) { }
}

export default new NewsController()