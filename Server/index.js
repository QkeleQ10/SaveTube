const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()

app.use(cors())

app.listen(4000, () => {
    console.log('Server Works !!! At port 4000')
})

app.get('/download', async (req, res) => {
    var URL = req.query.URL
    var ext = req.query.ext
    var filter
    if (ext === "mp3") filter = "audioonly"
    else filter = "videoandaudio"
    res.header('Content-Disposition', `attachment; filename="download.${ext}"`)
    ytdl(URL, { format: ext, filter: filter, }).pipe(res)
})