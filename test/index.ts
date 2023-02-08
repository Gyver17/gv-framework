import {createServer} from '../dist'

const app = createServer()

app.listen(5000, () => {
    console.log("Server on port", 5000)
})