const ytsr = require("ytsr");
const { SlashCommandBuilder, SlashCommandNumberOption } = require("discord.js");
const { execute } = require("./ping");
const ytdl = require("ytdl-core");
const { name } = require("../events/interactionCreate");

const options = {
  limit: 1,
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Search")
    .addStringOption((option) =>
      option.setName("input").setDescription("search for something")
    ),

  async execute(interaction) {
    console.log("test execute");
    let query = interaction.options.getString("input");

    const videoLink = await ytsr(query, options, function (err, searchResults) {
      console.log("test ytsr");
      if (err) throw err;
      console.log("past error check");
      let video = searchResults.items[0];
      let videoTitle = video.title;
      let videoLink = `https://www.youtube.com${video.link}`;
      return videoLink;
    });
    console.log(videoLink.items[0].id + " id ");
    await interaction.reply(videoLink.items[0].url);
  },
};
