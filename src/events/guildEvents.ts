import { Client, Events } from 'discord.js';
import { deployGuildCommands } from '../utils/deployGuildCommands';

export const registerGuildEvents = (client: Client) => {
  client.on(Events.GuildCreate, (guild) => {
    deployGuildCommands(guild.id);
    console.log(`Joined to a new server: ${guild.name}`);
  });
};
