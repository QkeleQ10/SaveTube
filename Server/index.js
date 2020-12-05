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
        var quality
        if (ext === "mp3") {
            filter = "audioonly"
            quality = "highestaudio"
        } else {
            filter = "videoandaudio"
            quality = "highestvideo"
        }

        res.header("Content-Disposition", `attachment; filename="download.${ext}"`)
        ytdl(URL, { format: ext, filter: filter, quality: quality }).pipe(res)
    } catch (err) { throw new Error('BROKEN') }
})

app.get("/", function (req, res) {
    throw new Error('BROKEN')
})