import { Client, ClientOptions, Collection } from 'discord.js';

export class DiscordClient extends Client {
  commands: Collection<string, unknown>;
  constructor(options: ClientOptions) {
    super(options);

    this.commands = new Collection();
  }
}