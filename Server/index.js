const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const app = express()

app.use(cors())

app.listen(process.env.PORT || 4000, () => {
    console.log("Server online at port " + process.env.PORT || "4000")
})

app.get("/download", async (req, res) => {
    try {
        var URL = req.query.URL
        var ext = req.query.ext
        var filter
        if (ext === "mp3") filter = "audioonly"
        else filter = "videoandaudio"
        res.header("Content-Disposition", `attachment; filename="download.${ext}"`)
        ytdl(URL, { format: ext, filter: filter, }).pipe(res)
    } catch (err) { throw err }
})

app.get("/", function (req, res) {
    throw new Error('BROKEN')
})