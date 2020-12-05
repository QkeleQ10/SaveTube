const express = require('express')
const cors = require('cors')
const ytdl = require('ytdl-core')
const ffmpeg = require('ffmpeg')
const app = express()

app.use(cors())

app.listen(process.env.PORT || 4000, () => {
    console.log("Server online at port " + process.env.PORT || "4000")
})

app.get("/download", async (req, res) => {
    try {
        var URL = req.query.URL
        var ext = req.query.ext

        res.header("Content-Disposition", `attachment; filename="download.${ext}"`)
        if (ext === "mp3") {
            ytdl(URL, { format: ext, filter: "audioonly", quality: "highestaudio" }).pipe(res)
        } else {
            const video = ytdl(url, { filter: 'videoonly' });
            const audio = ytdl(url, { filter: 'audioonly', highWaterMark: 1 << 25 });
            // Start the ffmpeg child process
            const ffmpegProcess = cp.spawn(ffmpeg, [
                // Remove ffmpeg's console spamming
                '-loglevel', '0', '-hide_banner',
                '-i', 'pipe:4',
                '-i', 'pipe:5',
                '-reconnect', '1',
                '-reconnect_streamed', '1',
                '-reconnect_delay_max', '4',
                // Rescale the video
                '-vf', 'scale=1980:1080',
                // Choose some fancy codes
                '-c:v', 'libx265', '-x265-params', 'log-level=0',
                '-c:a', 'flac',
                // Define output container
                '-f', 'matroska', 'pipe:6',
            ], {
                windowsHide: true,
                stdio: [
                    /* Standard: stdin, stdout, stderr */
                    'inherit', 'inherit', 'inherit',
                    /* Custom: pipe:4, pipe:5, pipe:6 */
                    'pipe', 'pipe', 'pipe',
                ],
            });

            audio.pipe(ffmpegProcess.stdio[4])
            video.pipe(ffmpegProcess.stdio[5])
            ffmpegProcess.stdio[6].pipe(res) // Combining and piping the streams for download directly to the response
        }
    } catch (err) { throw new Error('BROKEN') }
})

app.get("/", function (req, res) {
    throw new Error('BROKEN')
})