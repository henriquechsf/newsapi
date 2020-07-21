"use strict";
/**
 * Arquivo onde será configurado os middlewares e as rotas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
class StartUp {
    constructor() {
        this.app = express();
        this.routes();
    }
    // metodo para as rotas
    routes() {
        // rota default
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
    }
}
exports.default = new StartUp();
