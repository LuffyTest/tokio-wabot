let fetch = require('node-fetch')

let handler = async (m, { conn, command, text, usedPrefix }) => {
    if (!text) throw `🔺 Usage:\n${usedPrefix + command} <url>\n\nExample:\n${usedPrefix + command} https://play.google.com`
    let res = await fetch(global.API('neoxr', '/playstore', {
    url: args[0]
  }, 'APIKEY'))
    .then((result) => resolve(result))
    .catch((err) => reject(err))
  let url = json.server_1 || json.info[0].link || ''
  if (!url) throw 'Failed to fetch download url'
  let txt = json.info[0].text
    await m.reply(wait)
    conn.sendFile( m.chat, url, 'Chitoge.apk', null, m)
}
handler.help = ['apk'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(apk)$/i


module.exports = handler
