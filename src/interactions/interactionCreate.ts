import { CommandInteraction } from 'discord.js'

const options = [
  '🐭',
  'https://media.giphy.com/media/wJZTbXayokOgbCfyQe/giphy.gif',
  'https://media.giphy.com/media/QXh9XnIJetPi0/giphy.gif',
  '🐁',
]

module.exports = {
  name: 'interactionCreate',
  async execute(interaction: any) {
    if (!interaction.isCommand()) return

    if (interaction.commandName === 'blep') {
      await interaction.reply(
        options[Math.floor(Math.random() * options.length)]
      )
    }

    /*
    const command = interaction.client.commands.get(interaction.commandName)
    if (!command) {
      console.error(`No command matching ${interaction.commandName} was found.`)
      return
    }

    try {
      await command.execute(interaction)
    } catch (error) {
      console.error(`Error executing ${interaction.commandName}`)
      console.error(error)
    }
    */
  },
}
