"use strict";
/**
 * Arquivo onde será criado as queries no banco
 */
Object.defineProperty(exports, "__esModule", { value: true });
const NewsRepository_1 = require("../repositories/NewsRepository");
class NewsService {
    get() {
        return NewsRepository_1.default.find({});
    }
    getById(_id) {
        return NewsRepository_1.default.findById(_id);
    }
}
exports.default = new NewsService();
