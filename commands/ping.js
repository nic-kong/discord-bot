const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fuck')
    .setDescription('Replies with fuckback!'),
  async execute(interaction) {
    const wait = require('util').promisify(setTimeout);

    await interaction.reply('凸');
    await wait(4000);
    await interaction.deleteReply();
  },
};
