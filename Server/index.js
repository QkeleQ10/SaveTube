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
        const URL = req.query.URL,
            ext = req.query.ext

        res.header("Content-Disposition", `attachment; filename="download.${ext}"`)

        switch (ext) {
            case "mp4":
                ytdl(URL, { format: ext, filter: "videoandaudio", quality: "highestvideo" }).pipe(res)
                break
        
            case "mp3":
                ytdl(URL, { format: ext, filter: "audioonly", quality: "highestaudio" }).pipe(res)
                break
            
            default:
                throw new Error('No format was specified.')
                break
        }
    } catch (err) {
        res.redirect(`https://qkeleq10.github.io/SaveTube?error=${err}`)
        throw err
    }
})

app.get("/", function (req, res) {
    res.redirect(`https://qkeleq10.github.io/SaveTube?error=Cannot send an empty request.`)
    throw new Error('BROKEN')
})