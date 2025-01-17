let fetch = require('node-fetch')
let winScore = 500
async function handler(m) {
    this.game = this.game ? this.game : {}
    let id = 'family100_' + m.chat
    if (id in this.game) {
        this.reply(m.chat, 'There are still unanswered quizzes in this chat.', this.game[id].msg)
        throw false
    }
    let res = await fetch(global.API('xteam', '/game/family100', {}, 'APIKEY'))
    if (!res.ok) throw await res.text()
    let json = await res.json()
    if (!json.status) throw json
    let caption = 
*About:* ${json.soal}

There is *${json.jawaban.length}* answer${json.jawaban.find(v => v.includes(' ')) ? 
(some answers have spaces)
: ''}

+${winScore} XP each correct answer
    .trim()
    this.game[id] = {
        id,
        msg: await this.sendButton(m.chat, caption, author, 'GiveUp', 'nyerah', m),
        ...json,
        terjawab: Array.from(json.jawaban, () => false),
        winScore,
    }
}
handler.help = ['family100']
handler.tags = ['game']
handler.command = /^family100$/i

module.exports = handler
