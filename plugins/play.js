const { servers, yta, ytv } = require('../lib/y2mate')
let yts = require('yt-search')
let fetch = require('node-fetch')
let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw `What are you looking for?\n\n🔮 Example :\n${usedPrefix + command} california`
  let chat = global.db.data.chats[m.chat]
  let results = await yts(text)
  let vid = results.all.find(video => video.seconds < 3600)
  if (!vid) throw 'Content Not found!!'
  let isVideo = /2$/.test(command)
  let yt = false
  let yt2 = false
  let usedServer = servers[0]
  for (let i in servers) {
    let server = servers[i]
    try {
      yt = await yta(vid.url, server)
      yt2 = await ytv(vid.url, server)
      usedServer = server
      break
    } catch (e) {
      m.reply(`Server ${server} error!${servers.length >= i + 1 ? '' : '\ntried another server...'}`)
    }
  }
  if (yt === false) throw 'All Servers Down 😥'
  if (yt2 === false) throw 'All Servers Down 😪'
  let { dl_link, thumb, title, filesize, filesizeF } = yt
  await conn.send2ButtonLoc(m.chat, await (await fetch(thumb)).buffer(), `
*💫 Name:* ${title}
*▪️Audio File Size:* ${filesizeF}
*▫️Video File Size:* ${yt2.filesizeF}
*🔺Server y2mate:* ${usedServer}
`.trim(), '© Chitoge', '🔸 ᴀᴜᴅɪᴏ 🔸', `.yta ${vid.url}`, '🔹 ᴠɪᴅᴇᴏ 🔹', `.yt ${vid.url}`)
}
handler.help = ['play'].map(v => v + ' <pencarian>')
handler.tags = ['downloader']
handler.command = /^(p|play)$/i

handler.exp = 0

module.exports = handler
