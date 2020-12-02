var convertBtn = document.getElementById('convert-button')
var URLinput = document.getElementById('URL-input')
var ext = document.getElementById('extension')

convertBtn.addEventListener('click', () => {
    console.log(`URL: ${URLinput.value}`)
    sendURL(URLinput.value, ext.value)
})

function sendURL(URL, ext) {
    window.location.href = `https://savetube.herokuapp.com/download?URL=${URL}&ext=${ext}`
}