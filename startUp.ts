/**
 * Arquivo onde será configurado os middlewares e as rotas
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import Database from './src/infra/database'
import NewsController from './src/controller/NewsController'
import Auth from './src/infra/auth'

class StartUp {
    public app: express.Application
    private _db: Database
    private _bodyParser

    constructor() {
        this.app = express()
        this._db = new Database()

        this._db.createConnection()
        // !importante - necessario chamar os middlers antes das rotas
        this.middler()
        this.routes()
    }

    enableCors() {
        const options: cors.CorsOptions = {
            methods: "GET,OPTIONS,PUT,POST,DELETE",
            // aceita request de qualquer origem
            origin: "*"
        }
        this.app.use(cors(options))
    }

    middler() {
        this.enableCors()
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    // metodo para as rotas
    routes() {

        // rota default
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' })
        })

        // habilita validação jwt a partir destas rotas
        this.app.use(Auth.validate)

        // new
        this.app.route("/api/v1/news").get(NewsController.get)
        this.app.route("/api/v1/news/:id").get(NewsController.getById)
        this.app.route("/api/v1/news").post(NewsController.create)
        this.app.route("/api/v1/news/:id").put(NewsController.update)
        this.app.route("/api/v1/news/:id").delete(NewsController.delete)
    }
}

export default new StartUp()