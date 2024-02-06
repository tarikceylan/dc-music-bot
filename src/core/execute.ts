import { Events } from 'discord.js';

import 'dotenv/config';
import { DiscordClient } from './client';
import { Command } from '../types';

export const executeCommand = async (client: DiscordClient) => {
  client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) {
      return;
    }

    const discordClient = interaction.client as DiscordClient;
    const command = discordClient.commands.get(
      interaction.commandName
    ) as Command;

    await command.execute(interaction);
  });
};
