import { SlashCommandBuilder } from "discord.js";
import { awardRandomPowerup } from "../helpers/powerup.js";

export default {
  data: new SlashCommandBuilder()
    .setName("powerup")
    .setDescription("Award yourself a random powerup for the next trivia round"),

  async execute(interaction) {
    const guildId = interaction.guildId;
    const userId = interaction.user.id;

    const powerupWon = awardRandomPowerup(guildId, userId);

    if (powerupWon) {
      const powerupName = powerupWon === "freeze" ? "❄️ Freeze Time" : "💰 Double Points";
      await interaction.reply({ content: `🎁 You received a **${powerupName}** powerup for the next round!` });
    } else {
      await interaction.reply({ content: "❌ You already have a powerup! Use it in the next trivia round first." });
    }
  },
};