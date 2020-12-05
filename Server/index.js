const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const FFmpeg = require('ffmpeg')
const app = express()

app.use(cors())

app.listen(process.env.PORT || 4000, () => {
    console.log("Server online at port " + process.env.PORT || "4000")
})

app.get("/download", async (req, res) => {
    try {
        var URL = req.query.URL
        var f = req.query.ext
        var ext
        if (f === "va") ext = "mp4"
        if (f === "a") ext = "mp3"
        if (f === "v") ext = "mp4"

        res.header("Content-Disposition", `attachment; filename="download.${ext}"`)
        if (f === "a") {
            ytdl(URL, { format: ext, filter: "audioonly", quality: "highestaudio" }).pipe(res)
        } else if (f === "v") {
            ytdl(URL, { format: ext, filter: "videoonly", quality: "highestvideo" }).pipe(res)
        } else {
            ytdl(URL, { format: ext, filter: "videoandaudio", quality: "highestvideo" }).pipe(res)
        }
    } catch (err) {
        res.send({ err: err })
        throw err
    }
})

app.get("/", function (req, res) {
    res.send({ err: "empty" })
    throw new Error('BROKEN')
})