"use strict";
/**
 * Arquivo onde será configurado os middlewares e as rotas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database_1 = require("./src/infra/database");
const NewsController_1 = require("./src/controller/NewsController");
class StartUp {
    constructor() {
        this.app = express();
        this._db = new database_1.default();
        this._db.createConnection();
        // !importante - necessario chamar os middlers antes das rotas
        this.middler();
        this.routes();
    }
    enableCors() {
        const options = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            // aceita request de qualquer origem
            origin: "*"
        };
        this.app.use(cors(options));
    }
    middler() {
        this.enableCors();
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
    }
    // metodo para as rotas
    routes() {
        // rota default
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
        // new
        this.app.route("/api/v1/news").get(NewsController_1.default.get);
        this.app.route("/api/v1/news/:id").get(NewsController_1.default.getById);
        this.app.route("/api/v1/news").post(NewsController_1.default.create);
        this.app.route("/api/v1/news/:id").put(NewsController_1.default.update);
        this.app.route("/api/v1/news/:id").delete(NewsController_1.default.delete);
    }
}
exports.default = new StartUp();
