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
    const player = createAudioPlayer({
      behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
      },
    });

    if (!channel) {
      return interaction.reply(
        'You are not in a voice channel! Join a voice channel and try again.'
      );
    }

    const link = interaction.options.get('url').value as string;

    if (!ytdl.validateURL(link)) {
      return interaction.reply('Provide a valid youtube video link!');
    }

    const videoInfo = await ytdl.getInfo(link);
    const stream = ytdl(link, { filter: 'audioonly' });
    const resource = createAudioResource(stream);

    const connection = joinVoiceChannel({
      channelId: channel.id,
      guildId: channel.guild.id,
      adapterCreator: channel.guild.voiceAdapterCreator,
      selfDeaf: false,
      selfMute: false,
    });

    connection.subscribe(player);
    player.play(resource);

    interaction.reply(await prepareYoutubeEmbed(videoInfo, member));
  },
};

export default play;
