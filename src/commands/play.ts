import {
  CommandInteraction,
  GuildMember,
  SlashCommandBuilder,
} from 'discord.js';
import {
  NoSubscriberBehavior,
  createAudioPlayer,
  createAudioResource,
  joinVoiceChannel,
  getVoiceConnection,
} from '@discordjs/voice';
import ytdl from '@distube/ytdl-core';

import { prepareYoutubeEmbed } from '../utils/embeds';

const play = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays the audio in the link')
    .addStringOption((option) =>
      option.setName('url').setDescription('Youtube Link').setRequired(true)
    ),
  async execute(interaction: CommandInteraction) {
    const member = interaction.member as GuildMember;
    const channel = member.voice.channel;

    if (!channel) {
      return interaction.reply(
        'You are not in a voice channel! Join a voice channel and try again.'
      );
    }

    await interaction.deferReply();

    const link = interaction.options.get('url').value as string;

    if (!ytdl.validateURL(link)) {
      return interaction.editReply('Provide a valid youtube video link!');
    }

    try {
      const videoInfo = await ytdl.getInfo(link);
      const stream = ytdl(link, { filter: 'audioonly' });
      const resource = createAudioResource(stream);

      const existingConnection = getVoiceConnection(channel.guild.id);
      let connection;

      if (existingConnection) {
        connection = existingConnection;
      } else {
        connection = joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator,
          selfDeaf: false,
          selfMute: false,
        });
      }

      const player = createAudioPlayer({
        behaviors: {
          noSubscriber: NoSubscriberBehavior.Pause,
        },
      });

      connection.subscribe(player);
      player.play(resource);

      await interaction.editReply(await prepareYoutubeEmbed(videoInfo, member));
    } catch (error) {
      console.error(error);
      await interaction.editReply(
        'An error occurred while trying to play the audio.'
      );
    }
  },
};

export default play;
