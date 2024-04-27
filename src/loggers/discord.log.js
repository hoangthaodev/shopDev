'use strict'

const { Client, GatewayIntentBits } = require('discord.js')

const client = new Client({
    intents: [
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

client.on('ready', () => {
    console.log(`Logged is as ${client.user.tag}`)
})

const token = 'MTIzMzYzNTg0NjcxMjg1NjY2Nw.GTtFFU.e51deqe9sS6vM0xroP09or-AJYbHrVrhB4Eqtk'
client.login(token)

client.on('messageCreate', msg => {
    if (msg.author.bot) return
    if (msg.content === 'hello') {
        msg.reply(`Hello! How can i assits you today!`)
    }
})