"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const NewsService_1 = require("../services/NewsService");
class NewsController {
    constructor() {
        // metodo generico
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
    create(req, res) { }
    update(req, res) { }
    delete(req, res) { }
}
exports.default = new NewsController();
