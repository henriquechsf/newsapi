/**
 * Arquivo onde será configurado os middlewares e as rotas
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'
import * as cors from 'cors'

import Database from './src/infra/database'

import Auth from './src/infra/auth'
import uploads from './src/infra/uploads'
import newsRouter from './src/router/newsRouter'

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

        // upload de arquivo
        this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
            try {
                res.send("Arquivo enviado com sucesso!")
            } catch (error) {
                console.error(error)
            }
        })

        // habilita validação jwt a partir destas rotas
        this.app.use(Auth.validate)

        // new
        this.app.use('/', newsRouter)
    }
}

export default new StartUp()