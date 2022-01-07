let { GroupSettingChange } = require('@adiwajshing/baileys')
let handler = async (m, { conn, args, usedPrefix, command }) => {
	let isClose = {
		'open': false,
		'open': false,
		'on': false,
		'1': false,
		'close': true,
		'close': true,
		'off': true,
		'0': true,
	}[(args[0] || '')]
	if (isClose === undefined) {
		await conn.send2Button(m.chat, `
Pengunaan:
${usedPrefix + command} <open/close>
Contoh:
${usedPrefix + command} tutup
${usedPrefix + command} buka
	`.trim(), '© Chitoge', 'Open', ',grup 1', 'Closed', ',group 0', m)
		throw 0
	}
	await conn.groupSettingChange(m.chat, GroupSettingChange.messageSend, isClose)
}
handler.help = ['group <Open/Closed>']
handler.tags = ['group']
handler.command = /^(gro?up)$/i

handler.admin = true
handler.botAdmin = true

module.exports = handler
