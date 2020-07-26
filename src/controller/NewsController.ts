import * as HttpStatus from 'http-status'
import NewsService from '../services/NewsService'
import * as redis from 'redis'

import Helper from '../infra/helper'
import ExportFiles from '../infra/exportFiles'
import { response } from 'express'

class NewsController {

    async get(req, res) {
        try {
            // redis
            let client = redis.createClient(6379, 'redis')

            await client.get('news', async function (err, reply) {
                if (reply) {
                    console.log('redis')
                    Helper.sendResponse(res, HttpStatus.OK, JSON.parse(reply))
                } else {
                    // Usando async await
                    let result = await NewsService.get()
                    client.set('news', JSON.stringify(result))
                    client.expire('news', 20)
                    Helper.sendResponse(res, HttpStatus.OK, result)
                }
            })
        } catch (error) {
            console.error(`Error: ${error}`)
        }

        /* Usando promise - não usamos try catch
        NewsService.get()
            .then(news => {
                console.log('db')
                client.set('news', JSON.stringify(news))
                client.expire('news', 20)
                Helper.sendResponse(res, HttpStatus.OK, news)
            })
            .catch(error => console.error.bind(console, `Error: ${error}`))
        

        // mongo
        NewsService.get()
            .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
            .catch(error => console.error.bind(console, `Error ${error}`))
        */
    }

    async getById(req, res) {
        try {
            const _id = req.params.id

            // Async Await
            let result = await NewsService.getById(_id)
            Helper.sendResponse(res, HttpStatus.OK, result)
        } catch (error) {
            console.error(`Error: ${error}`)
        }

        /* Promise
           const _id = req.params.id
           NewsService.getById(_id)
               .then(news => Helper.sendResponse(res, HttpStatus.OK, news))
               .catch(error => console.error.bind(console, `Error ${error}`))
           */
    }

    async exportToCsv(req, res) {
        try {
            let result = await NewsService.get()
            let fileName = ExportFiles.tocsv(result)
            Helper.sendResponse(res, HttpStatus.OK, req.get('host') + "/exports/" + fileName)
        } catch (error) {
            console.error(`Error: ${error}`)
        }
    }

    async create(req, res) {
        try {
            let vm = req.body
            await NewsService.create(vm)
            Helper.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!")
        } catch (error) {
            console.error(`Error: ${error}`)
        }

        /* Promise
        let vm = req.body
        NewsService.create(vm)
            .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Notícia cadastrada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`))
        */
    }

    async update(req, res) {
        try {
            const _id = req.params.id
            let vm = req.body

            // Async Await
            await NewsService.update(_id, vm)
            Helper.sendResponse(res, HttpStatus.CREATED, "Notícia foi atualizada com sucesso!")
        } catch (error) {
            console.error(`Error: ${error}`)
        }

        /* Promise
        const _id = req.params.id
        let vm = req.body
        NewsService.update(_id, vm)
            .then(news => Helper.sendResponse(res, HttpStatus.CREATED, "Notícia foi atualizada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`))
        */
    }

    async delete(req, res) {
        try {
            const _id = req.params.id
            await NewsService.delete(_id)
            Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!")
        } catch (error) {
            console.error(`Error: ${error}`)
        }

        /*
        const _id = req.params.id
        NewsService.delete(_id)
            .then(() => Helper.sendResponse(res, HttpStatus.OK, "Notícia deletada com sucesso!"))
            .catch(error => console.error.bind(console, `Error ${error}`))
        */
    }
}

export default new NewsController()