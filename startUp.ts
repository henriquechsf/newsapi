/**
 * Arquivo onde será configurado os middlewares e as rotas
 */

import * as express from 'express'

import Database from './src/infra/database'

class StartUp {
    public app: express.Application
    private _db: Database

    constructor() {
        this.app = express()
        this._db = new Database()

        this._db.createConnection()
        this.routes()
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