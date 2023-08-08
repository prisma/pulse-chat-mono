import express from 'express';
import http from 'http';
import cors from 'cors'

const app = express()
app.use(cors())

app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'ok'
    })
})

const server = http.createServer(app)

export default server
