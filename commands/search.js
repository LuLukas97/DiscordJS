const { SlashCommandBuilder, SlashCommandNumberOption } = require("discord.js");
var search = require("youtube-search");
const { execute } = require("./ping");
const ytdl = require('ytdl-core');


module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search for a song")
    .addStringOption((option) =>
      option.setName("input").setDescription("The input to echo back")
    ),
  async execute(interaction) {
    await interaction.reply("test");
  },
};