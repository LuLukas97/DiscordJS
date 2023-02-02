const {
  SlashCommandBuilder,
  SlashCommandNumberOption,
  message,
} = require("discord.js");
const play = require("play-dl");
const {
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  NoSubscriberBehavior,
  getVoiceConnection,
} = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("search")
    .setDescription("Play Music")
    .addStringOption((option) =>
      option.setName("input").setDescription("Play a song")
    ),

  async execute(interaction) {
    let query = interaction.options.getString("input");

    if (!interaction.member.voice?.channel)
      return interaction.reply("Connect to a Voice Channel");

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channel.id,
      guildId: interaction.guild.id,
      adapterCreator: interaction.guild.voiceAdapterCreator,
      selfDeaf: false,
    });

    let yt_info = await play.search(query, { limit: 1 });

    let stream = await play.stream(yt_info[0].url);

    let resource = createAudioResource(stream.stream, {
      inputType: stream.type,
    });

    let player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Play,
      },
    });
    await interaction.reply(`Playing ${yt_info} !`);

    await new Promise((resolve) => {
      player.play(resource);
      connection.subscribe(player);
      resolve();
    });
  },
};
