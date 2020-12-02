var convertBtn = document.getElementById('convert-button')
var URLinput = document.getElementById('URL-input')
var ext = document.getElementById('extension')

convertBtn.addEventListener('click', () => {
    convertBtn.style.opacity = "0.5"
    convertBtn.style.pointerEvents = "none"

    if (URLinput.value.includes("youtu") && URLinput.value.includes("://") && URLinput.value.includes("watch")) {
        sendURL(URLinput.value, ext.value)
    } else {
        URLinput.placeholder = "No URL provided!"
        setTimeout(() => {
            convertBtn.style.opacity = "unset"
            convertBtn.style.pointerEvents = "unset"
            URLinput.placeholder = "Paste a YouTube URL here"
        }, 2000)
    }
})

function sendURL(URL, ext) {
    window.location.href = `https://savetube.herokuapp.com/download?URL=${URL}&ext=${ext}`
    setTimeout(() => {
        convertBtn.style.opacity = "unset"
        convertBtn.style.pointerEvents = "unset"
    }, 10000)
}