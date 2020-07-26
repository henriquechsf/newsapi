"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpStatus = require("http-status");
const NewsService_1 = require("../services/NewsService");
const redis = require("redis");
const helper_1 = require("../infra/helper");
class NewsController {
    get(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // redis
                let client = redis.createClient(6379, 'redis');
                yield client.get('news', function (err, reply) {
                    return __awaiter(this, void 0, void 0, function* () {
                        if (reply) {
                            console.log('redis');
                            helper_1.default.sendResponse(res, HttpStatus.OK, JSON.parse(reply));
                        }
                        else {
                            // Usando async await
                            let result = yield NewsService_1.default.get();
                            client.set('news', JSON.stringify(result));
                            client.expire('news', 20);
                            helper_1.default.sendResponse(res, HttpStatus.OK, result);
                        }
                    });
                });
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            /* Usando promise - não usamos try catch
            NewsService.get()
                .then(news => {
                    console.log('db')
                    client.set('news', JSON.stringify(news))
                    client.expire('news', 20)
                    Helper.sendResponse(res, HttpStatus.OK, news)
                })
                .catch(error => console.error.bind(console, `Error: ${error}`))
            */
            // mongo
            NewsService_1.default.get()
                .then(news => helper_1.default.sendResponse(res, HttpStatus.OK, news))
                .catch(error => console.error.bind(console, `Error ${error}`));
        });
    }
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                // Async Await
                let result = yield NewsService_1.default.getById(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, result);
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            /* Promise
               const _id = req.params.id
               NewsService.getById(_id)
                   .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
                   .catch(error => console.error.bind(console, `Error ${error}`))
               */
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let vm = req.body;
                yield NewsService_1.default.create(vm);
                helper_1.default.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!");
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            /* Promise
            let vm = req.body
            NewsService.create(vm)
                .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!"))
                .catch(error => console.error.bind(console, `Error ${error}`))
            */
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                let vm = req.body;
                // Async Await
                yield NewsService_1.default.update(_id, vm);
                helper_1.default.sendResponse(res, HttpStatus.CREATED, "Notícia foi atualizada com sucesso!");
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            /* Promise
            const _id = req.params.id
            let vm = req.body
            NewsService.update(_id, vm)
                .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Notícia foi atualizada com sucesso!"))
                .catch(error => console.error.bind(console, `Error ${error}`))
            */
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const _id = req.params.id;
                yield NewsService_1.default.delete(_id);
                helper_1.default.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!");
            }
            catch (error) {
                console.error(`Error: ${error}`);
            }
            /*
            const _id = req.params.id
            NewsService.delete(_id)
                .then(() => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
                .catch(error => console.error.bind(console, `Error ${error}`))
            */
        });
    }
}
exports.default = new NewsController();
