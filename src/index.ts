import 'dotenv/config'
import path from 'path'
import { Intents, Client, MessageComponent } from 'discord.js'
import { CoreClient } from 'discord-bot-core-client'
import axios from 'axios'

import { embeds, componentMessage } from './ExampleMessageFormat'
import DiscordRoles, { roleType } from './utils/roles'

const coreClient = new CoreClient({
  token: process.env.DISCORD_BOT_TOKEN as string,
  clientOptions: {
    intents: [
      Intents.FLAGS.GUILDS,
      Intents.FLAGS.GUILD_MEMBERS,
      Intents.FLAGS.GUILD_INTEGRATIONS,
      Intents.FLAGS.GUILD_WEBHOOKS,
      Intents.FLAGS.GUILD_VOICE_STATES,
      Intents.FLAGS.GUILD_PRESENCES,
      Intents.FLAGS.GUILD_MESSAGES,
      Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    ],
  },
})
coreClient.registerBotsIn(path.resolve(__dirname, 'bots')).start()

/**
 * ROLES MANAGE
 */
const roles = new DiscordRoles()

/**
 * COMMANDS
 */
const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_WEBHOOKS,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
})

// client.commands = new Collection()
/*
const eventsPath = path.join(__dirname, 'interactions')
const eventFiles = fs
  .readdirSync(eventsPath)
  .filter((file) => file.endsWith('.ts'))

for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file)
  const event = require(filePath)
  console.log('event', event)
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args))
  } else {
    client.on(event.name, (...args) => event.execute(...args))
  }
}
*/

client.on('messageCreate', async (msg) => {
  if (msg.content.includes('rolesuccess: ')) {
    const messageContent = msg.content.replace('rolesuccess: ', '')
    const args = messageContent.trim().split(', ') // .slice(prefix.length)
    const [roleId, roleName, rolePermissions, roleColor] = args
    if (roleId === undefined) return
    const roleSuccessMessage = [
      {
        color: 3447003,
        author: {
          name: 'Flow',
          icon_url: 'https://i.imgur.com/lm8s41J.png',
        },
        title: 'Duplicate rôle',
        url: '',
        description: '',
        fields: [
          {
            name: 'Role ID',
            value: roleId,
            inline: false,
          },
          {
            name: 'Role Name',
            value: roleName,
            inline: true,
          },
          {
            name: 'Role Permissions',
            value: rolePermissions,
            inline: true,
          },
          {
            name: 'Role Color',
            value: roleColor,
            inline: true,
          },
          {
            name: '\u200b',
            value: '\u200b',
          },
        ],
        timestamp: new Date(),
        footer: {
          icon_url: 'http://i.imgur.com/w1vhFSR.png',
          text: 'Le rôle à été dupliqué avec succès',
        },
      },
    ]
    msg.channel.send({ embeds: roleSuccessMessage })
  } else {
    /*
    switch (msg.content) {
      case 'ping':
        // const args = msg.content.trim().split(' ') // .slice(prefix.length)
        // console.log('args', args)
        msg.channel.send({ embeds })
        break
      //our meme command below
      case '!meme':
        msg.channel.send("Here's your meme!") //Replies to user command
        const img = await getMeme() //fetches an URL from the API
        msg.channel.send(img) //send the image URL
        break
    }
    */
  }
})

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  if (interaction.commandName === 'copyrole') {
    const role_id = interaction.options.getString('role_id')
    // const permissions = interaction.options.getString('permissions')
    const role_name = interaction.options.getString('role_name')
    const role_color = interaction.options.getString('role_color')

    // Call API Save Role
    const roleList = await roles.getGuildRoles(process.env.GUILD_ID as string)
    const roleAtDuplicate = roleList.find(
      (role: roleType) => role.id === role_id
    )
    roles.addGuildRole(process.env.GUILD_ID as string, {
      name: role_name as string,
      color: Number(role_color),
      permissions: roleAtDuplicate?.permissions as string,
    })

    // const boolean = interaction.options.getBoolean('boolean')
    /*
    await interaction.reply(
      `The role ID is ${role_id}, The role ${role_name} with the permissions ${permissions} at the color ${role_color} has been duplicated`
    )
    */
    await interaction.reply(
      `rolesuccess: ${role_id}, ${role_name}, ${role_color}` // , ${permissions}
    )
  }
})
client.login(process.env.DISCORD_BOT_TOKEN)

/*
client.once('ready', (c) => {
  console.log(
    'Félicitations, votre bot Discord a été correctement initialisé !'
  )
  console.log(`Ready! Logged in as ${c.user.tag} | ${c.user.username}`)
})
*/
/*
client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return

  const command = client.commands.get(interaction.commandName)

  if (!command) return

  const { cooldowns } = client

  if (!cooldowns.has(command.data.name)) {
    cooldowns.set(command.data.name, new Collection())
  }

  const now = Date.now()
  const timestamps = cooldowns.get(command.data.name)
  const defaultCooldownDuration = 3
  const cooldownAmount = (command.cooldown ?? defaultCooldownDuration) * 1000

  if (timestamps.has(interaction.user.id)) {
    const expirationTime = timestamps.get(interaction.user.id) + cooldownAmount

    if (now < expirationTime) {
      const expiredTimestamp = Math.round(expirationTime / 1000)
      return interaction.reply({
        content: `Please wait, you are on a cooldown for \`${command.data.name}\`. You can use it again <t:${expiredTimestamp}:R>.`,
        ephemeral: true,
      })
    }
  }

  timestamps.set(interaction.user.id, now)
  setTimeout(() => timestamps.delete(interaction.user.id), cooldownAmount)

  try {
    await command.execute(interaction)
  } catch (error) {
    console.error(error)
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    })
  }
})
*/

/*
client.cooldowns = new Collection()
client.commands = new Collection()
const foldersPath = path.join(__dirname, 'commands')
const commandFolders = fs.readdirSync(foldersPath)

for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder)
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith('.js'))
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file)
    const command = require(filePath)
    if ('data' in command && 'execute' in command) {
      client.commands.set(command.data.name, command)
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      )
    }
  }
}


const embed = new MessageEmbed()
  .setColor(0x3498db)
  .setAuthor(
    'Author Name, it can hold 256 characters',
    'https://i.imgur.com/lm8s41J.png'
  )
  .setTitle('This is your title, it can hold 256 characters')
  .setURL('https://discord.js.org/#/docs/main/stable/class/MessageEmbed')
  .setDescription('This is the main body of text, it can hold 4096 characters.')
  .setImage('http://i.imgur.com/yVpymuV.png')
  .setThumbnail('http://i.imgur.com/p2qNFag.png')
  .addField(
    'This is a single field title, it can hold 256 characters',
    'This is a field value, it can hold 1024 characters.'
  )
  .addFields(
    {
      name: 'Inline fields',
      value:
        'They can have different fields with small headlines, and you can inline them.',
      inline: true,
    },
    {
      name: 'Masked links',
      value:
        'You can put [masked links](https://discord.js.org/#/docs/main/master/class/MessageEmbed) inside of rich embeds.',
      inline: true,
    },
    {
      name: 'Markdown',
      value: 'You can put all the *usual* **__Markdown__** inside of them.',
      inline: true,
    }
  )
  .addField('\u200b', '\u200b')
  .setTimestamp()
  .setFooter(
    'This is the footer text, it can hold 2048 characters',
    'http://i.imgur.com/w1vhFSR.png'
  )

*/
