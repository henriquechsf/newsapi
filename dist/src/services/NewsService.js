"use strict";
/**
 * Arquivo onde será criado as queries no banco
 */
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
const NewsRepository_1 = require("../repositories/NewsRepository");
class NewsService {
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NewsRepository_1.default.find({});
        });
    }
    getById(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NewsRepository_1.default.findById(_id);
        });
    }
    create(news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NewsRepository_1.default.create(news);
        });
    }
    update(_id, news) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NewsRepository_1.default.findByIdAndUpdate(_id, news);
        });
    }
    delete(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield NewsRepository_1.default.findByIdAndRemove(_id);
        });
    }
}
exports.default = new NewsService();
