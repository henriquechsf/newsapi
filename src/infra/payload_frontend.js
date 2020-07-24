const jwt = require('jsonwebtoken')

let payload = {
    iss: "henriquesouza.me",
    iat: new Date().getSeconds(),
    exp: new Date().setMinutes(60),
    username: "Carlos Henrique",
    email: "henrique@email.com"
}

let token = jwt.sign(payload, "batman")

console.log(token)