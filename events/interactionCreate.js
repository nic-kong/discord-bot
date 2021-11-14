module.exports = {
  name: 'interactionCreate',
  execute(client, interaction) {
    console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);
 
    if (!interaction.isCommand()) {
      return;
    }
  
    const command = client.commands.get(interaction.commandName);
    if (command) {
      command.execute(interaction);
    }
  },
};
