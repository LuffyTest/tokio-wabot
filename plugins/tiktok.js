let fetch = require('node-fetch')

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `🔺 Usage:\n${usedPrefix + command} <url>\n\nExample:\n${usedPrefix + command} https://vt.tiktok.com/ZGJBtcsDq/`
    let res = await fetch(API('neoxr', '/api/download/tiktok', { url: args[0] }, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    await m.reply(wait)
    await conn.sendFile(m.chat, json.videoSD, 'tiktok.mp4', '© Chitoge', m)
}
handler.help = ['tiktok'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(tiktok|tt)$/i


module.exports = handler
