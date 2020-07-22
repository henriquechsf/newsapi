/**
 * Arquivo onde será configurado os middlewares e as rotas
 */

import * as express from 'express'
import * as bodyParser from 'body-parser'

import Database from './src/infra/database'

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

    middler() {
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({ extended: false }))
    }

    // metodo para as rotas
    routes() {
        // rota default
        this.app.route('/').get((req, res) => {
            res.send({ versao: '0.0.1' })
        })
    }
}

export default new StartUp()