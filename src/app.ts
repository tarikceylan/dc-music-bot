import { Events, GatewayIntentBits } from 'discord.js';
import 'dotenv/config';

import { DiscordClient } from './core/client';
import { executeCommand } from './core/execute';
import { bindCommands } from './utils';

const client = new DiscordClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});

bindCommands(client);

executeCommand(client);

client.on(Events.ClientReady, (readyClient) => {
  console.log(`${readyClient.user.tag} is ALIVE!`);
});

client.login(process.env.TOKEN);
