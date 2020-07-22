"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const NewsService_1 = require("../services/NewsService");
class NewsController {
    constructor() {
        // metodo generico de resposta
        this.sendResponse = (res, statusCode, data) => {
            res.status(statusCode).json({ result: data });
        };
    }
    get(req, res) {
        NewsService_1.default.get()
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    getById(req, res) {
        const _id = req.params.id;
        NewsService_1.default.getById(_id)
            .then(news => this.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    create(req, res) {
        let vm = req.body;
        NewsService_1.default.create(vm)
            .then(news => this.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    update(req, res) {
        const _id = req.params.id;
        let vm = req.body;
        NewsService_1.default.update(_id, vm)
            .then(news => this.sendResponse(res, HttpStatus.CREATED, ` ${news.title} foi atualizada com sucesso!`))
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
    delete(req, res) {
        const _id = req.params.id;
        NewsService_1.default.delete(_id)
            .then(() => this.sendResponse(HttpStatus.OK), "Notícia deletada com sucesso!")
            .catch(error => console.error.bind(console, `Error ${error}`));
    }
}
exports.default = new NewsController();
