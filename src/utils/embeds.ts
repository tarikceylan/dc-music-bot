import { EmbedBuilder, GuildMember } from 'discord.js';
import { videoInfo } from '@distube/ytdl-core';

export const prepareYoutubeEmbed = async (
  content: videoInfo,
  member: GuildMember
) => {
  const memberAvatar = member.displayAvatarURL();
  const embedImage = content.videoDetails.thumbnails
    .filter((item) => item.width > 250)
    .shift();
  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle('**:loudspeaker: Playing Now**')
    .setImage(embedImage.url)
    .addFields({
      name: `:notes: ${content.videoDetails.title}`,
      value: `${content.videoDetails.video_url}`,
    })
    .setFooter({
      text: `Requested by ${member.user.displayName}`,
      iconURL: memberAvatar,
    });

  return { embeds: [embed] };
};
