"use strict";
/**
 * Arquivo onde será configurado os middlewares e as rotas
 */
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const compression = require("compression");
const database_1 = require("./src/infra/database");
const auth_1 = require("./src/infra/auth");
const uploads_1 = require("./src/infra/uploads");
const newsRouter_1 = require("./src/router/newsRouter");
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
        this.app.use(compression());
    }
    // metodo para as rotas
    routes() {
        // rota default
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' });
        });
        // upload de arquivo
        this.app.route("/uploads").post(uploads_1.default.single("file"), (req, res) => {
            try {
                res.send("Arquivo enviado com sucesso!");
            }
            catch (error) {
                console.error(error);
            }
        });
        // habilita validação jwt a partir destas rotas
        this.app.use(auth_1.default.validate);
        // new routes
        this.app.use('/', newsRouter_1.default);
    }
}
exports.default = new StartUp();
