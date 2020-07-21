/**
 * Arquivo onde será configurado os middlewares e as rotas
 */

import * as express from 'express'

class StartUp {
    public app: express.Application

    constructor() {
        this.app = express()
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