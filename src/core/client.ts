import {
  Client,
  ClientOptions,
  Collection,
  GatewayIntentBits,
} from 'discord.js';

export class DiscordClient extends Client {
  commands: Collection<string, unknown>;
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
  }
}

export const voxClient = new DiscordClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
