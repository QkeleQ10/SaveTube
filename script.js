const elmBtn = document.getElementById('convert-button'),
    elmURL = document.getElementById('URL-input'),
    elmExt = document.getElementById('extension'),
    elmErr = document.getElementById('toast1')
let strings = {},
    langCode = "en"

gstrings(1)

elmBtn.addEventListener('click', () => {
    elmBtn.style.opacity = "0.5"
    elmBtn.style.pointerEvents = "none"

    if (/^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/igm.test(elmURL.value) && elmURL.value.length >= 18) {
        sendURL(elmURL.value, elmExt.value)
    } else {
        elmErr.classList.remove("collapsed")
        if (strings.e) document.getElementById("error").innerHTML = strings.e.inv || "Invalid URL."
        else document.getElementById("error").innerHTML = "Invalid URL."
        if (elmURL.value.length < 1) {
            if (strings.e) document.getElementById("error").innerHTML = strings.e.none || "No URL provided."
            else document.getElementById("error").innerHTML = "No URL provided."
        }
        setTimeout(() => {
            elmBtn.style.opacity = "unset"
            elmBtn.style.pointerEvents = "unset"
        }, 2000)

        setTimeout(() => {
            elmErr.classList.add("collapsed")
        }, 10000)
    }
})

function sendURL(URL, ext) {
    window.location.href = `https://savetube.herokuapp.com/download?URL=${URL}&ext=${ext}`
    setTimeout(() => {
        elmBtn.style.opacity = "unset"
        elmBtn.style.pointerEvents = "unset"
    }, 10000)
}

async function gstrings(t) {
    let langCookie = document.cookie.split("lang=")[1]
    if (langCookie) langCookie = langCookie.split(";")[0]
    langCode = langCookie || window.navigator.language || "en"
    if (t > 1) langCode = window.navigator.language.split("-")[0] || "en"
    if (t > 2) langCode = "en"
    let request = new XMLHttpRequest()
    request.open('GET', `https://raw.githubusercontent.com/QkeleQ10/Localisation/master/strings/${langCode}.json`)
    request.responseType = 'json'
    request.send()
    request.onloadend = function () {
        if (!strings || request.status == 404) gstrings(t + 1)
        strings = request.response
        document.documentElement.lang = langCode
        document.querySelectorAll(".l18n").forEach(e => e.innerHTML = strings[e.innerHTML].replace("%dev%", "Quinten Althues").replace("%support%", "undefined") || e.innerHTML)
        document.querySelectorAll(".l18nP").forEach(e => e.placeholder = strings[e.placeholder] || e.placeholder)
        document.querySelectorAll(".languagediv>*").forEach(e => {
            e.setAttribute("tabindex", "0")
            if (e.getAttribute("onclick").slice(24, 29).split("'")[0] == langCode) {
                e.style.backgroundColor = "var(--transparent)"
                e.style.color = "var(--background)"
                document.getElementById("languagediv").append(e)
            }
        })
    }
}