class Helper {
    // metodo generico de resposta
    sendResponse = function (res, statusCode, data) {
        res.status(statusCode).json({ result: data })
    }
}

export default new Helper()