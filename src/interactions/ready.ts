import { Client } from 'discord.js'

module.exports = {
  name: 'ready',
  once: true,
  execute(client: any) {
    console.log(
      'Félicitations, votre bot Discord a été correctement initialisé !'
    )
    console.log(
      `Ready! Logged in as ${client.user.tag} | ${client.user.username}`
    )
  },
}
