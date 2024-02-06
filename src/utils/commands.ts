import fs from 'fs';
import path from 'path';

import { SlashCommandBuilder } from 'discord.js';

import { DiscordClient } from '../core';

const commandsFolder = path.join(__dirname, '../', 'commands');

export const getCommandFiles = () => {
  return fs
    .readdirSync(commandsFolder)
    .filter((file: string) => file.endsWith('.ts'));
};

export const bindCommands = async (client: DiscordClient) => {
  const commandFiles = getCommandFiles();
  for (const file of commandFiles) {
    const filePath = path.join(commandsFolder, file);
    const { default: command } = await import(filePath);

    if (command && command.data instanceof SlashCommandBuilder) {
      client.commands.set(command.data.name, command);
    } else {
      console.error(`Invalid command file: ${file}`);
    }
  }
};

export const prepareCommandsForDeploy = async () => {
  const commands = [];
  const commandFiles = getCommandFiles();

  for (const file of commandFiles) {
    const filePath = path.join(commandsFolder, file);
    const { default: command } = await import(filePath);
    if ('data' in command && 'execute' in command) {
      commands.push(command.data.toJSON());
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
      );
    }
  }

  return commands;
};
