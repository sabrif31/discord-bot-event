import { MessageEmbedOptions } from 'discord.js'

export const componentMessage = {
  content: 'Mason is looking for new arena partners. What classes do you play?',
  components: [
    {
      type: 1,
      components: [
        {
          type: 3,
          custom_id: 'class_select_1',
          options: [
            {
              label: 'Rogue',
              value: 'rogue',
              description: 'Sneak n stab',
              emoji: {
                name: 'rogue',
                id: '625891304148303894',
              },
            },
            {
              label: 'Mage',
              value: 'mage',
              description: "Turn 'em into a sheep",
              emoji: {
                name: 'mage',
                id: '625891304081063986',
              },
            },
            {
              label: 'Priest',
              value: 'priest',
              description: "You get heals when I'm done doing damage",
              emoji: {
                name: 'priest',
                id: '625891303795982337',
              },
            },
          ],
          placeholder: 'Choose a class',
          min_values: 1,
          max_values: 3,
        },
      ],
    },
  ],
}

export const embeds: MessageEmbedOptions[] = [
  {
    color: 3447003,
    author: {
      name: 'Author Name, it can hold 256 characters',
      iconURL: 'https://i.imgur.com/lm8s41J.png',
    },
    thumbnail: {
      url: 'http://i.imgur.com/p2qNFag.png',
    },
    image: {
      url: 'http://i.imgur.com/yVpymuV.png',
    },
    title: 'This is your title, it can hold 256 characters',
    url: 'https://discord.js.org/#/docs/main/master/class/MessageEmbed',
    description: 'This is the main body of text, it can hold 2048 characters.',
    fields: [
      {
        name: 'This is a single field title, it can hold 256 characters',
        value: 'This is a field value, it can hold 1024 characters.',
        inline: false,
      },
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
      },
      {
        name: '\u200b',
        value: '\u200b',
        inline: false,
      },
    ],
    timestamp: new Date().getTime(),
    footer: {
      iconURL: 'http://i.imgur.com/w1vhFSR.png',
      text: 'This is the footer text, it can hold 2048 characters',
    },
  },
]
