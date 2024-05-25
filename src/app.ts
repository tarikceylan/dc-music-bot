import 'dotenv/config';

import { executeCommand } from './core/execute';
import { bindCommands } from './utils';
import { voxClient } from './core';
import { Client, Events } from 'discord.js';
import { deployGuildCommands } from './utils/deployGuildCommands';
import { registerClientEvents, registerGuildEvents } from './events';

registerClientEvents(voxClient);
registerGuildEvents(voxClient);

bindCommands(voxClient);

executeCommand(voxClient);

voxClient.login(process.env.TOKEN);
