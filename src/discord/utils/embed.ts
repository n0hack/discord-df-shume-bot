import { EmbedBuilder } from 'discord.js';

export class ShumeEmbedBuilder extends EmbedBuilder {
  constructor() {
    super({
      color: 0x0099ff,
      footer: {
        text: 'Made by Lucid(Ming)',
        iconURL: 'https://github.com/n0hack/discord-df-brunch-bot/assets/42988225/e25ffd9d-a330-439d-8ce1-0e6af3649260',
      },
    });
  }
}
