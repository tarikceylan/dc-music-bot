import { REST, Routes } from 'discord.js';

import 'dotenv/config';

const rest = new REST().setToken(process.env.TOKEN);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: [] }
    );

    console.log(`Successfully deleted all guild commands.`);
  } catch (error) {
    console.error(error);
  }
})();
