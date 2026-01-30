import { InteractionResponse, SlashCommandBuilder } from "discord.js";
const hintHelper = require('../helpers/hintHelper.js');

export default {
  data: new SlashCommandBuilder()
    .setName("hint")
    .setDescription("Get a hint")
    .addStringOption(option =>
      option
        .setName("song_name")
        .setDescription("Choose a song")
        .setRequired(true)
    ),

  async execute(interaction) {
    // This is not the final implementation; in the future it will detect which song is currently being
    // guessed and get details from iTunes
    let input = interaction.options.getString("song_name");
    const hint = hintHelper.getHint(input);

    await interaction.reply({
      content: "Here is your hint: " + hint,
    });

    
  },
};