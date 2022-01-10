let handler = async (m, { conn, text, usedPrefix, isAdmin, isOwner }) => {
    if (m.isGroup) {
        if (!(isAdmin || isOwner)) return dfail('admin', m, conn)
    }
    conn.vote = conn.vote ? conn.vote : {}
    let id = m.chat
    if (id in conn.vote) return conn.sendButton(m.chat, 'There are still votes in this chat!', '© Chitoge <3', 'Delete', `${usedPrefix}-vote`, m)
    conn.send2Button(m.chat, `Vote Started!
*${usedPrefix}upvote* - To Agree
*${usedPrefix}devote* - To Disagree
*${usedPrefix}check Vote* - To Check Votes
*${usedPrefix}unvote* - To Delete vote`, '© Chitoge <3', '🔺 ᴜᴘᴠᴏᴛᴇ 🔺', `${usedPrefix}upvote`, '🔻 ᴅᴇᴠᴏᴛᴇ 🔻', `${usedPrefix}devote`, m)
    conn.vote[id] = [
        text,
        [],
        []
    ]
}
handler.help = ['startvote [Reason]']
handler.tags = ['vote']
handler.command = /^(start|mulai|\+)vote$/i

module.exports = handler
