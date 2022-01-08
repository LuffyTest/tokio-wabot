let fetch = require('node-fetch')

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `🔺 Usage:\n${usedPrefix + command} <url>\n\nExample:\n${usedPrefix + command} https://vt.tiktok.com/ZGJBtcsDq/`
    let res = await fetchJson(`https://api.neoxr.eu.org/api/playstore?${url}&apikey=1RB98Fy9gg`),
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    await m.reply(wait)
    await conn.sendFile(m.chat, json.apk, '.apk', '© Chitoge', m)
}
handler.help = ['apk'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(apk)$/i


module.exports = handler
