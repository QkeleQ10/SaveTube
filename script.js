var convertBtn = document.getElementById('convert-button')
var URLinput = document.getElementById('URL-input')
var ext = document.getElementById('extension')

strings(1)

convertBtn.addEventListener('click', () => {
    convertBtn.style.opacity = "0.5"
    convertBtn.style.pointerEvents = "none"

    if (/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/igm.test(URLinput.value) && URLinput.value.length >= 18) {
        sendURL(URLinput.value, ext.value)
    } else {
        document.getElementById("toast1").classList.remove("collapsed")
        if (strings.e) document.getElementById("error").innerHTML = strings.e.inv || "Invalid URL."
        else document.getElementById("error").innerHTML = "Invalid URL."
        setTimeout(() => {
            convertBtn.style.opacity = "unset"
            convertBtn.style.pointerEvents = "unset"
            document.getElementById("toast1").classList.add("collapsed")
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

function strings(t) {
    let langCookie = document.cookie.split("lang=")[1]
    if (langCookie) langCookie = langCookie.split(";")[0]
    let langCode = langCookie || window.navigator.language || "en"
    if (t > 1) langCode = window.navigator.language.split("-")[0] || "en"
    let requestURL = "https://qkeleq10.github.io/SaveTube/strings/" + langCode + ".json"
    let request = new XMLHttpRequest()
    let strings = {}
    request.open('GET', requestURL)
    request.responseType = 'json'
    request.send()
    request.onload = function () {
        strings = request.response
        document.querySelectorAll(".l18n").forEach(e => e.innerHTML = strings[e.innerHTML] || e.innerHTML)
        document.querySelectorAll(".l18nP").forEach(e => e.placeholder = strings[e.placeholder] || e.placeholder)
    }
    request.onerror = function () {
        strings(t++)
    }
}