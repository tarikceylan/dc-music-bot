import { REST, Routes } from 'discord.js';
import { prepareCommandsForDeploy } from './commands';

import 'dotenv/config';

const rest = new REST().setToken(process.env.TOKEN);

export const deployGuildCommands = async (guildId: string) => {
  try {
    const commands = await prepareCommandsForDeploy();

    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, guildId),
      { body: commands }
    );

    console.log(`Successfully deployed ${commands.length} commands.`);
  } catch (error) {
    console.error(error);
  }
};
