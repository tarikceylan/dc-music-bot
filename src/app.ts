import 'dotenv/config';

import { executeCommand } from './core/execute';
import { bindCommands } from './utils';
import { voxClient } from './core';
import { Client, Events } from 'discord.js';
import { deployGuildCommands } from './utils/deployGuildCommands';

bindCommands(voxClient);

executeCommand(voxClient);

voxClient.on(Events.ClientReady, (client: Client) => {
  console.log(`${client.user.tag} is ALIVE!`);
});

voxClient.on(Events.GuildCreate, (guild) => {
  deployGuildCommands(guild.id);
  console.log(`Joined to a new server: ${guild.name}`);
});

voxClient.login(process.env.TOKEN);
