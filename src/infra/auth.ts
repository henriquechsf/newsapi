import * as jwt from 'jsonwebtoken'
import configs, * as Configs from './configs'

class Auth {

    validate(req, res, next) {

        const token = req.headers['x-access-token']

        if (token) {
            jwt.verify(token, configs.secret, function (err, decode) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: '403 - Invalid token'
                    })
                } else {
                    next()
                }
            })
        } else {
            return res.status(401).send({
                success: false,
                message: '401 - Unauthorized'
            })
        }
    }
}