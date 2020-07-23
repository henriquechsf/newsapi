/**
 * Arquivo onde será configurado a porta com o listen
 */

import StartUp from './startUp'

let port = process.env.PORT || 3050

StartUp.app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})